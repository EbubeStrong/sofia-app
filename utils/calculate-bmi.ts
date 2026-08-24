// utils/bmi.ts

export interface BMIResult {
  bmi: number;
  category: string;
  healthStatus: string;
  color: string;
}

/**
 * Calculate BMI (Body Mass Index)
 * @param weight - Weight in kilograms (kg)
 * @param height - Height in centimeters (cm)
 * @returns BMI result with category and health status
 */
export function calculateBMI(weight: number, height: number): BMIResult | null {
  // Validate inputs
  if (!weight || !height || weight <= 0 || height <= 0) {
    return null;
  }

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI: weight (kg) / height (m)²
  const bmi = weight / (heightInMeters * heightInMeters);

  // Round to 1 decimal place
  const roundedBMI = Math.round(bmi * 10) / 10;

  // Determine category based on WHO standards
  let category: string;
  let healthStatus: string;
  let color: string;

  if (roundedBMI < 16) {
    category = "Severe Thinness";
    healthStatus = "Severely underweight";
    color = "#DC2626"; // red-600
  } else if (roundedBMI >= 16 && roundedBMI < 17) {
    category = "Moderate Thinness";
    healthStatus = "Moderately underweight";
    color = "#F97316"; // orange-500
  } else if (roundedBMI >= 17 && roundedBMI < 18.5) {
    category = "Mild Thinness";
    healthStatus = "Mildly underweight";
    color = "#FBBF24"; // amber-400
  } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
    category = "Normal";
    healthStatus = "Healthy weight";
    color = "#10B981"; // green-500
  } else if (roundedBMI >= 25 && roundedBMI < 30) {
    category = "Overweight";
    healthStatus = "Overweight";
    color = "#FBBF24"; // amber-400
  } else if (roundedBMI >= 30 && roundedBMI < 35) {
    category = "Obese Class I";
    healthStatus = "Moderately obese";
    color = "#F97316"; // orange-500
  } else if (roundedBMI >= 35 && roundedBMI < 40) {
    category = "Obese Class II";
    healthStatus = "Severely obese";
    color = "#DC2626"; // red-600
  } else {
    category = "Obese Class III";
    healthStatus = "Very severely obese";
    color = "#991B1B"; // red-800
  }

  return {
    bmi: roundedBMI,
    category,
    healthStatus,
    color,
  };
}

/**
 * Format BMI for display
 * @param bmi - BMI value
 * @returns Formatted string
 */
export function formatBMI(bmi: number): string {
  return bmi.toFixed(1);
}

/**
 * Calculate ideal weight range based on height
 * @param height - Height in centimeters (cm)
 * @returns Min and max healthy weight in kg
 */
export function calculateIdealWeightRange(height: number): {
  min: number;
  max: number;
} | null {
  if (!height || height <= 0) {
    return null;
  }

  const heightInMeters = height / 100;

  // Healthy BMI range is 18.5 - 24.9
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24.9 * (heightInMeters * heightInMeters);

  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
  };
}

/**
 * Get BMI category only (simple version)
 * @param weight - Weight in kilograms (kg)
 * @param height - Height in centimeters (cm)
 * @returns BMI category string
 */
export function getBMICategory(weight: number, height: number): string | null {
  const result = calculateBMI(weight, height);
  return result?.category ?? null;
}
