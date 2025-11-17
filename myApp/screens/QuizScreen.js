// components/QuizScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params; // quiz passed from CourseScreen
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quiz[currentQuestion];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === question.answer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <View style={styles.container}>
      {!showResult ? (
        <>
          <Text style={styles.questionCount}>
            Question {currentQuestion + 1} of {quiz.length}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>

          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.optionSelected
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedOption && { backgroundColor: '#6b7280' },
            ]}
            disabled={!selectedOption}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === quiz.length - 1 ? 'Finish' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Your Score:</Text>
        <Text style={styles.scoreText}>
        {score} / {quiz.length}
        </Text>

       {/* Calculates percentage and show pass/fail */}

        {(() => {
        const percentage = (score / quiz.length) * 100;
        const passed = percentage >= 75;

        return (
            <>
            <Text
                style={[
                styles.resultMessage,
                { color: passed ? '#22c55e' : '#ef4444' },
                ]}
            >
                {passed
                ? `✅ Congratulations! You passed with ${percentage.toFixed(0)}%.`
                : `❌ You scored ${percentage.toFixed(0)}%. You need 75% to pass.`}
            </Text>

            <TouchableOpacity
                style={[
                styles.homeButton,
                { backgroundColor: passed ? '#2563eb' : '#6b7280' },
                ]}
                onPress={() => navigation.navigate('Info')}
            >
                <Text style={styles.homeButtonText}>📘 Back to Courses</Text>
            </TouchableOpacity>
            </>
            );
        })()}
        </View>
        )}
    </View>
    );
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  questionCount: {
    color: '#9ca3af',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionSelected: {
    backgroundColor: '#2563eb',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    color: '#2563eb',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  homeButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },

  resultMessage: {
  fontSize: 18,
  fontWeight: '600',
  marginTop: 10,
  marginBottom: 25,
  textAlign: 'center',
  },

  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
