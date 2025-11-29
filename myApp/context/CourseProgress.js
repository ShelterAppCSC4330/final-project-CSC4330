import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CourseProgress = createContext();

export function Progress({ children }) {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  useEffect(() => {
    const loadProgress = async () => {
      const saved = await AsyncStorage.getItem("completedCourses");
      const savedBadges = await AsyncStorage.getItem("earnedBadges");

      if (saved) setCompletedCourses(JSON.parse(saved));
      if (savedBadges) setEarnedBadges(JSON.parse(savedBadges));
    };
    loadProgress();
  }, []);

  const markCourseCompleted = async (courseId, badgeName) => {
     let updatedCourses = completedCourses;
     if (!updatedCourses.includes(courseId)) {
      updatedCourses = [...updatedCourses, courseId];
      setCompletedCourses(updatedCourses);
      await AsyncStorage.setItem("completedCourses", JSON.stringify(updatedCourses));
    }

     if (badgeName && !earnedBadges.includes(badgeName)) {
      const updatedBadges = [...earnedBadges, badgeName];
      setEarnedBadges(updatedBadges);
      await AsyncStorage.setItem("earnedBadges", JSON.stringify(updatedBadges));
    }
  
  };

  return (
    <CourseProgress.Provider value={{ completedCourses, earnedBadges,markCourseCompleted }}>
      {children}
    </CourseProgress.Provider>
  );
}
