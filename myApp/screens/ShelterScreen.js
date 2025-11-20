import React, { useMemo, useRef, useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useShelters } from "../context/ShelterProvider";

export default function ShelterScreen() {
  const mapRef = useRef(null);
  //pull in shelters from context
  const { shelters, loading, loadError } = useShelters();

  //states for user interface
  const [userLoc, setUserLoc] = useState(null); //state for latitude and longitude of user
  const [statusFilter, setStatusFilter] = useState("all"); //state for status filter: all, open, other
  const [distanceFilter, setDistanceFilter] = useState("any"); //state for distance filter: any, 5, 10 , 25
  const [sheetCollapsed, setSheetCollapsed] = useState(true); //state for bottom sheet
  const [selectedShelter, setSelectedShelter] = useState(null); //state for shelter selected on map

  const onUserLocationChange = (e) => {
    const c = e.nativeEvent?.coordinate;
    if (c && !userLoc) {
      setUserLoc({ latitude: c.latitude, longitude: c.longitude });
    }
  };
  //meant to calculate distance between two coordinates
  const haversineMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getStatusInfo = (shelter) => {
    const raw = (shelter.status || shelter.shelter_status_code || "")
      .toString()
      .toUpperCase()
      .trim();

    if (!raw) {
      return { label: "Unknown", color: "#facc15" };
    }
    if (raw.includes("OPEN")) {
      return { label: "Open", color: "#22c55e" };
    }
    if (raw.includes("FULL") || raw.includes("CLOS")) {
      return { label: raw, color: "#ef4444" };
    }
    return { label: raw, color: "#f97316" };
  };

  // Add distance (miles) and sort by distance
  const sheltersWithDistance = useMemo(() => {
    if (!userLoc) {
      return shelters.map((s) => ({ ...s, distanceMiles: null }));
    }
    return [...shelters]
      .map((s) => {
        const m = haversineMeters(
          userLoc.latitude,
          userLoc.longitude,
          s.latitude,
          s.longitude
        );
        return { ...s, distanceMiles: m / 1609.34 };
      })
      .sort(
        (a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity)
      );
  }, [shelters, userLoc]);

  // Status filter
  const statusFiltered = useMemo(() => {
    if (statusFilter === "all") return sheltersWithDistance;

    return sheltersWithDistance.filter((s) => {
      const status = (s.status || s.shelter_status_code || "")
        .toString()
        .toUpperCase();

      if (statusFilter === "open") {
        return status === "OPEN";
      }
      return status !== "OPEN";
    });
  }, [sheltersWithDistance, statusFilter]);

  // Distance filter
  const filteredShelters = useMemo(() => {
    if (distanceFilter === "any" || !userLoc) return statusFiltered;

    const threshold = parseInt(distanceFilter, 10); // 5, 10, 25
    return statusFiltered.filter(
      (s) => s.distanceMiles != null && s.distanceMiles <= threshold
    );
  }, [statusFiltered, distanceFilter, userLoc]);

  const openCount = useMemo(
    () =>
      filteredShelters.filter((s) => {
        const status = (s.status || s.shelter_status_code || "")
          .toString()
          .toUpperCase();
        return status === "OPEN";
      }).length,
    [filteredShelters]
  );

  //to autofit markers on map
  useEffect(() => {
    if (!mapRef.current) return;
    if (!filteredShelters || filteredShelters.length === 0) return;

    const coords = filteredShelters
      .filter(
        (s) => typeof s.latitude === "number" && typeof s.longitude === "number"
      )
      .map((s) => ({
        latitude: s.latitude,
        longitude: s.longitude,
      }));

    if (coords.length === 0) return;

    if (coords.length === 1) {
      mapRef.current.animateToRegion({
        ...coords[0],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: {
          top: 80,
          right: 40,
          bottom: 240,
          left: 40,
        },
        animated: true,
      });
    }
  }, [filteredShelters]);
  //opens directions in maps app based on platform
  const openDirections = (lat, lng) => {
    const url =
      Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
        android: `google.navigation:q=${lat},${lng}&mode=d`,
      }) || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const centerOnUser = () => {
    if (userLoc && mapRef.current) {
      mapRef.current.animateToRegion({
        ...userLoc,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

  const centerOnShelter = (shelter) => {
    if (!mapRef.current || !shelter) return;
    mapRef.current.animateToRegion({
      latitude: shelter.latitude,
      longitude: shelter.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  const handleMarkerPress = (shelter) => {
    setSelectedShelter(shelter);
    centerOnShelter(shelter);
  };

  const toggleSheet = () => setSheetCollapsed((prev) => !prev);
  //coordinates for Louisiana
  const initialRegion = {
    latitude: 30.9843,
    longitude: -91.9623,
    latitudeDelta: 3,
    longitudeDelta: 3,
  };

  const renderFilterButton = (value, label) => {
    const active = statusFilter === value;
    return (
      <TouchableOpacity
        key={value}
        style={[styles.filterButton, active && styles.filterButtonActive]}
        onPress={() => setStatusFilter(value)}
      >
        <Text
          style={[
            styles.filterButtonText,
            active && styles.filterButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDistanceButton = (value, label) => {
    const active = distanceFilter === value;
    return (
      <TouchableOpacity
        key={value}
        style={[styles.filterButton, active && styles.filterButtonActive]}
        onPress={() => setDistanceFilter(value)}
      >
        <Text
          style={[
            styles.filterButtonText,
            active && styles.filterButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const chevron = sheetCollapsed ? "▲" : "▼";

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        onUserLocationChange={onUserLocationChange}
        initialRegion={initialRegion}
      >
        {!loading &&
          !loadError &&
          filteredShelters.map((s) => {
            const statusInfo = getStatusInfo(s);
            const id = s.id || s.external_id;
            const selectedId =
              selectedShelter &&
              (selectedShelter.id || selectedShelter.external_id);
            const isSelected = selectedId === id;

            return (
              <Marker
                key={id}
                coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                onPress={() => handleMarkerPress(s)}
              >
                <View style={styles.markerOuter}>
                  <View
                    style={[
                      styles.markerInner,
                      isSelected && styles.markerInnerSelected,
                      { backgroundColor: statusInfo.color },
                    ]}
                  />
                </View>
              </Marker>
            );
          })}
      </MapView>

      {/* card for selected shelter */}
      {selectedShelter && (
        <View style={styles.selectedCard}>
          <View style={styles.selectedHeaderRow}>
            <Text style={styles.selectedName}>{selectedShelter.name}</Text>
            <TouchableOpacity onPress={() => setSelectedShelter(null)}>
              <Text style={styles.selectedClose}>✕</Text>
            </TouchableOpacity>
          </View>
          {!!selectedShelter.city && (
            <Text style={styles.selectedMeta}>{selectedShelter.city}</Text>
          )}
          {!!selectedShelter.parish && (
            <Text style={styles.selectedMeta}>
              {selectedShelter.parish} Parish
            </Text>
          )}
          {!!selectedShelter.address && (
            <Text style={styles.selectedMeta}>{selectedShelter.address}</Text>
          )}
          <View style={styles.selectedMetaRow}>
            {(() => {
              const statusInfo = getStatusInfo(selectedShelter);
              return (
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: statusInfo.color + "33" },
                  ]}
                >
                  <Text style={styles.statusPillText}>
                    {" "}
                    {statusInfo.label}{" "}
                  </Text>
                </View>
              );
            })()}
            {selectedShelter.distanceMiles != null && (
              <Text style={styles.selectedDistance}>
                {(Math.round(selectedShelter.distanceMiles * 10) / 10).toFixed(
                  1
                )}{" "}
                mi away
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() =>
              openDirections(
                selectedShelter.latitude,
                selectedShelter.longitude
              )
            }
          >
            <Text style={styles.selectedButtonText}>Get directions</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendRow}>
          <Text style={[styles.legendDot, { color: "#22c55e" }]}>●</Text>
          <Text style={styles.legendText}>Open</Text>
        </View>
        <View style={styles.legendRow}>
          <Text style={[styles.legendDot, { color: "#f97316" }]}>●</Text>
          <Text style={styles.legendText}>Limited / Other</Text>
        </View>
        <View style={styles.legendRow}>
          <Text style={[styles.legendDot, { color: "#ef4444" }]}>●</Text>
          <Text style={styles.legendText}>Full / Closed</Text>
        </View>
      </View>

      {/* my location button */}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={centerOnUser}
        activeOpacity={0.8}
      >
        <Text style={styles.myLocationText}>My location</Text>
      </TouchableOpacity>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <TouchableOpacity
          style={styles.sheetHeaderRow}
          onPress={toggleSheet}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.sheetTitle}>Nearest shelters</Text>
            {sheetCollapsed ? (
              <Text style={styles.sheetSub}>Tap to view list and filters</Text>
            ) : (
              <>
                <Text style={styles.sheetSub}>
                  {openCount} open • {filteredShelters.length} total
                  {distanceFilter !== "any"
                    ? ` • within ${distanceFilter} mi`
                    : ""}
                </Text>
                {userLoc && (
                  <Text style={styles.sheetSubSecondary}>
                    Sorted by distance from your location
                  </Text>
                )}
                {!userLoc && (
                  <Text style={styles.sheetSubSecondary}>
                    Waiting for your location…
                  </Text>
                )}
              </>
            )}
          </View>
          <Text style={styles.chevron}>{chevron}</Text>
        </TouchableOpacity>

        {/* Collapsed view */}
        {sheetCollapsed ? null : (
          <>
            {loading && (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#93c5fd" />
                <Text style={styles.loadingText}>Loading shelters…</Text>
              </View>
            )}

            {loadError && !loading && (
              <Text style={styles.emptyText}>{loadError}</Text>
            )}

            {!loading && !loadError && (
              <>
                {/*filter on status*/}
                <View style={styles.filterRow}>
                  {renderFilterButton("all", "All")}
                  {renderFilterButton("open", "Open")}
                  {renderFilterButton("other", "Other")}
                </View>

                {/*filter on distance*/}
                <View style={styles.filterRow}>
                  {renderDistanceButton("any", "Any distance")}
                  {renderDistanceButton("5", "≤ 5 mi")}
                  {renderDistanceButton("10", "≤ 10 mi")}
                  {renderDistanceButton("25", "≤ 25 mi")}
                </View>

                {!userLoc && distanceFilter !== "any" && (
                  <Text style={styles.noticeText}>
                    Distance filter needs your location. Once we have it,
                    results will be limited to the selected range.
                  </Text>
                )}

                {filteredShelters.length === 0 ? (
                  <Text style={styles.emptyText}>
                    No shelters match this filter. Try a larger distance or
                    “Any”.
                  </Text>
                ) : (
                  <FlatList
                    data={filteredShelters.slice(0, 10)}
                    keyExtractor={(it) => (it.id || it.external_id).toString()}
                    ItemSeparatorComponent={() => <View style={styles.sep} />}
                    renderItem={({ item }) => {
                      const miles =
                        item.distanceMiles != null
                          ? Math.round(item.distanceMiles * 10) / 10
                          : undefined;
                      const statusInfo = getStatusInfo(item);
                      const locationText =
                        item.city || item.address || "Louisiana";

                      return (
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => {
                            setSelectedShelter(item);
                            centerOnShelter(item);
                            openDirections(item.latitude, item.longitude);
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemMeta}>{locationText}</Text>
                            <View style={styles.itemMetaRow}>
                              {miles !== undefined && (
                                <Text style={styles.distanceText}>
                                  {miles} mi away
                                </Text>
                              )}
                              {!!statusInfo.label && (
                                <View
                                  style={[
                                    styles.statusPill,
                                    {
                                      backgroundColor: statusInfo.color + "33",
                                    },
                                  ]}
                                >
                                  <Text style={styles.statusPillText}>
                                    {statusInfo.label}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <Text style={styles.cta}> Route </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1220" },
  map: { flex: 1 },

  markerOuter: {
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: "#020617cc",
    borderWidth: 1,
    borderColor: "#020617",
  },
  markerOuterSelected: {
    borderWidth: 2,
    borderColor: "#bfdbfe",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  markerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e", //change based on status
  },
  markerInnerSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },

  //selected shelter card
  selectedCard: {
    position: "absolute",
    top: 95,
    left: 16,
    right: 16,
    backgroundColor: "#020617ee",
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  selectedHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedName: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  selectedClose: {
    color: "#9ca3af",
    fontSize: 16,
  },
  selectedMeta: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 2,
  },
  selectedMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  selectedDistance: {
    color: "#93c5fd",
    fontSize: 12,
    marginLeft: 8,
  },
  selectedButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2563eb",
    alignItems: "center",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },

  legend: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#020617dd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  legendTitle: {
    color: "#9ca3af",
    fontSize: 11,
    marginBottom: 4,
    fontWeight: "500",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  legendDot: {
    fontSize: 12,
    marginRight: 6,
  },
  legendText: {
    color: "#e5e7eb",
    fontSize: 12,
  },
  myLocationButton: {
    position: "absolute",
    right: 16,
    bottom: 200,
    backgroundColor: "#111827ee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 900,
  },
  myLocationText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "500",
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#111827ee",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 16,
    maxHeight: "50%",
  },

  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 900,
    backgroundColor: "#4b5563",
    marginBottom: 8,
  },
  sheetHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  sheetTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  sheetSub: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
  },
  sheetSubSecondary: {
    color: "#6b7280",
    fontSize: 11,
    marginTop: 2,
    marginLeft: 2,
  },
  chevron: {
    color: "#e5e7eb",
    fontSize: 18,
    marginRight: 8,
  },
  filterRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 2,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 900,
    borderWidth: 1.5,
    borderColor: "#4b5563",
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: "#111827",
  },
  filterButtonActive: {
    backgroundColor: "#1f2937",
    borderColor: "#60a5fa",
  },
  filterButtonText: {
    color: "#e5e7eb",
    fontSize: 13,
  },
  filterButtonTextActive: {
    color: "#bfdbfe",
    fontWeight: "600",
  },
  sep: { height: 8 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  itemName: { color: "white", fontWeight: "600" },
  itemMeta: {
    color: "#cbd5e1",
    marginTop: 2,
    fontSize: 13,
  },
  itemMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  distanceText: {
    color: "#93c5fd",
    fontSize: 12,
    marginRight: 8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 900,
  },
  statusPillText: {
    color: "#e5e7eb",
    fontSize: 11,
    fontWeight: "500",
  },
  cta: {
    color: "#93c5fd",
    fontWeight: "700",
    marginLeft: 10,
  },
  emptyText: {
    color: "#e5e7eb",
    fontSize: 13,
    marginTop: 8,
  },
  noticeText: {
    color: "#fde68a",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  loadingText: {
    color: "#e5e7eb",
    marginLeft: 8,
    fontSize: 13,
  },
});
