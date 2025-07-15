import type { Product } from '@/lib/woocommerce';
import { woocommerce } from '@/lib/woocommerce';

export interface QuizQuestion {
  id: string;
  question: string;
  icon: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export interface QuizAnswers {
  [key: string]: string;
}

export const QuizData: QuizQuestion[] = [
  {
    id: 'people',
    question: 'Voor hoeveel personen zoek je een noodpakket?',
    icon: '👥',
    options: [
      { value: '1', label: '1 persoon', description: 'Solo of aanvulling' },
      { value: '2', label: '2 personen', description: 'Koppels' },
      { value: '4', label: '3-4 personen', description: 'Gezinnen' },
      { value: '6+', label: '5+ personen', description: 'Grote groepen' }
    ]
  },
  {
    id: 'duration',
    question: 'Hoe lang wil je voorbereid zijn?',
    icon: '⏱️',
    options: [
      { value: '3', label: '3 dagen (72 uur)', description: 'Overheid advies' },
      { value: '7', label: '1 week', description: 'Extra zekerheid' },
      { value: '14', label: '2 weken', description: 'Uitgebreid' },
      { value: '30+', label: '1 maand+', description: 'Maximum' }
    ]
  },
  {
    id: 'priority',
    question: 'Wat is het belangrijkste voor jou?',
    icon: '🎯',
    options: [
      { value: 'price', label: 'Betaalbare prijs', description: 'Beste waarde' },
      { value: 'variety', label: 'Variatie', description: 'Diverse maaltijden' },
      { value: 'shelf-life', label: 'Houdbaarheid', description: '5+ jaar' },
      { value: 'complete', label: 'Compleet pakket', description: 'Alles-in-één' }
    ]
  },
  {
    id: 'drinks',
    question: 'Wil je water/drinken erbij?',
    icon: '💧',
    options: [
      { value: 'yes', label: 'Ja, graag', description: 'Met water' },
      { value: 'no', label: 'Nee, niet nodig', description: 'Alleen voedsel' },
      { value: 'maybe', label: 'Maakt niet uit', description: 'Flexibel' }
    ]
  },
  {
    id: 'type',
    question: 'Welk type pakket past bij jou?',
    icon: '📦',
    options: [
      { value: 'compact', label: 'Compact', description: 'Ruimtebesparend' },
      { value: 'complete', label: 'Compleet', description: 'Alle extra\'s' },
      { value: 'balanced', label: 'Gebalanceerd', description: 'Goede mix' }
    ]
  }
];

// Product matching logic
export async function getRecommendedProducts(answers: QuizAnswers): Promise<Product[]> {
  try {
    // Fetch all products
    const allProducts = await woocommerce.getProducts({
      per_page: 100
    });

    // Score each product based on answers
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      const name = product.name.toLowerCase();
      const description = (product.short_description + ' ' + product.description).toLowerCase();
      const price = parseFloat(product.price);

      // People count matching
      const people = parseInt(answers.people || '2');
      if (people === 1 && (name.includes('1 persoon') || name.includes('solo'))) score += 3;
      else if (people === 2 && (name.includes('2 persoon') || name.includes('duo'))) score += 3;
      else if (people >= 3 && people <= 4 && (name.includes('gezin') || name.includes('4 persoon') || name.includes('familie'))) score += 3;
      else if (people >= 5 && (name.includes('groot') || name.includes('bedrijf') || name.includes('kantoor'))) score += 3;

      // Duration matching
      const duration = answers.duration;
      if (duration === '3' && (name.includes('3 dagen') || name.includes('72 uur') || description.includes('72 uur'))) score += 3;
      else if (duration === '7' && (name.includes('7 dagen') || name.includes('week'))) score += 3;
      else if (duration === '14' && (name.includes('14 dagen') || name.includes('2 weken'))) score += 3;
      else if (duration === '30+' && (name.includes('30 dagen') || name.includes('maand') || name.includes('90 dagen'))) score += 3;

      // Priority matching
      const priority = answers.priority;
      if (priority === 'price' && price < 100) score += 2;
      else if (priority === 'variety' && (description.includes('variatie') || description.includes('divers') || description.includes('verschillende'))) score += 2;
      else if (priority === 'shelf-life' && (description.includes('5 jaar') || description.includes('10 jaar') || description.includes('lang houdbaar'))) score += 2;
      else if (priority === 'complete' && (name.includes('compleet') || name.includes('uitgebreid') || description.includes('alles-in-één'))) score += 2;

      // Drinks preference
      const drinks = answers.drinks;
      if (drinks === 'yes' && (name.includes('water') || description.includes('drinkwater') || description.includes('drinken'))) score += 2;
      else if (drinks === 'no' && !(name.includes('water') || description.includes('drinkwater'))) score += 1;

      // Type preference
      const type = answers.type;
      if (type === 'compact' && (name.includes('compact') || name.includes('basis') || description.includes('ruimtebesparend'))) score += 2;
      else if (type === 'complete' && (name.includes('compleet') || name.includes('uitgebreid') || name.includes('premium'))) score += 2;
      else if (type === 'balanced' && !name.includes('basis') && !name.includes('premium')) score += 1;

      // Bonus points for popular products
      // Note: featured and total_sales are not available in the Product type

      return { product, score };
    });

    // Sort by score and return top 3
    const recommended = scoredProducts
      .filter(item => item.score > 0 && item.product.stock_status === 'instock')
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);

    // If we have less than 3 recommendations, add some default good products
    if (recommended.length < 3) {
      const defaultProducts = allProducts
        .filter(p => 
          p.stock_status === 'instock' && 
          !recommended.find(r => r.id === p.id) &&
          parseFloat(p.price) < 150
        )
        .slice(0, 3 - recommended.length);
      
      recommended.push(...defaultProducts);
    }

    return recommended;
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    return [];
  }
}