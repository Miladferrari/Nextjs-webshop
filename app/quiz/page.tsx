'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizData, QuizAnswers, getRecommendedProducts } from './QuizData';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/lib/woocommerce';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quiz-state');
    if (savedState) {
      const { currentQuestion: savedQuestion, answers: savedAnswers } = JSON.parse(savedState);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('quiz-state', JSON.stringify({ currentQuestion, answers }));
  }, [currentQuestion, answers]);

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [QuizData[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, fetch recommendations
      setIsLoading(true);
      try {
        const products = await getRecommendedProducts(newAnswers);
        setRecommendedProducts(products);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedProducts([]);
    localStorage.removeItem('quiz-state');
  };

  const progress = ((currentQuestion + (showResults ? 1 : 0)) / (QuizData.length + 1)) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-off-white to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-medical-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-blue text-lg font-medium">Jouw perfecte noodpakket wordt gezocht...</p>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-off-white to-white py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-navy-blue mb-3 md:mb-4">
              Jouw Persoonlijke Aanbevelingen
            </h1>
            <p className="text-base md:text-lg text-steel-gray max-w-2xl mx-auto px-4">
              Op basis van jouw antwoorden hebben we de perfecte noodpakketten voor je gevonden:
            </p>
          </motion.div>

          {recommendedProducts.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {recommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-steel-gray">Geen producten gevonden die aan jouw criteria voldoen.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-8 py-3 bg-white border-2 border-medical-green text-medical-green rounded-full font-semibold hover:bg-medical-green/10 transition-all duration-200"
            >
              Opnieuw beginnen
            </button>
            <Link
              href="/shop"
              className="px-8 py-3 bg-amber-orange text-white rounded-full font-semibold hover:bg-amber-orange/90 transition-all duration-200 text-center"
            >
              Bekijk alle producten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = QuizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-medical-green to-amber-orange"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-6 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-steel-gray hover:text-navy-blue mb-4 md:mb-8 group text-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Terug naar home</span>
          </Link>
          
          <h1 className="text-2xl md:text-4xl font-bold text-navy-blue mb-2 md:mb-4">
            Vind Jouw Perfecte Noodpakket
          </h1>
          <p className="text-steel-gray text-sm md:text-lg">
            Vraag {currentQuestion + 1} van {QuizData.length}
          </p>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-12"
          >
            {/* Question Icon */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
              <span className="text-xl md:text-2xl">{question.icon}</span>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-3 md:p-5 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl md:rounded-2xl transition-all duration-200 text-left group border-2 border-transparent hover:border-medical-green/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-navy-blue text-base md:text-lg">{option.label}</p>
                      {option.description && (
                        <p className="text-xs md:text-sm text-steel-gray mt-0.5">{option.description}</p>
                      )}
                    </div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-medical-green opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            {currentQuestion > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handlePrevious}
                className="mt-6 md:mt-8 text-steel-gray hover:text-navy-blue font-medium flex items-center gap-2 mx-auto text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Vorige vraag</span>
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}