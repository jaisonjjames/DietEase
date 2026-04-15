import { useState, useMemo } from 'react';
import './App.css';
import type { UserInputs, UnitSystem, Meal } from './types';
import { calculateResults } from './utils/calculations';
import { MEAL_DATA } from './data/meals';

function App() {
  const [units, setUnits] = useState<UnitSystem>('imperial');
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs] = useState<UserInputs>({
    age: 25,
    gender: 'male',
    weight: 180,
    heightFt: 5,
    heightIn: 10,
    heightCm: 175,
    activity: 1.2,
    preference: 'non-veg',
    prepTime: 'quick'
  });

  const [meals, setMeals] = useState<Record<string, Meal>>({
    breakfast: MEAL_DATA.breakfast[0],
    lunch: MEAL_DATA.lunch[0],
    dinner: MEAL_DATA.dinner[0]
  });

  const results = useMemo(() => calculateResults(inputs, units), [inputs, units]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [id]: (id === 'gender' || id === 'preference' || id === 'prepTime') ? value : (value === '' ? 0 : parseFloat(value))
    }));
  };

  const shuffleMeals = () => {
    const newMeals: Record<string, Meal> = {};
    ['breakfast', 'lunch', 'dinner'].forEach(type => {
      let filtered = MEAL_DATA[type].filter(m => {
        if (inputs.preference === 'veg' && m.pref === 'non-veg') return false;
        if (inputs.prepTime === 'quick' && m.prep === 'traditional') return false;
        return true;
      });
      if (filtered.length === 0) filtered = MEAL_DATA[type];
      newMeals[type] = filtered[Math.floor(Math.random() * filtered.length)];
    });
    setMeals(newMeals);
  };

  const generatePlan = () => {
    shuffleMeals();
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header>
        <h1>DietEase</h1>
        <p className="subtitle">Malayali Diaspora Edition (USA)</p>
      </header>

      <main className="main-content">
        {!showResults ? (
          <div className="card">
            <div className="unit-toggle">
              <button 
                className={units === 'imperial' ? 'active' : ''} 
                onClick={() => setUnits('imperial')}
              >
                Imperial (lbs/ft)
              </button>
              <button 
                className={units === 'metric' ? 'active' : ''} 
                onClick={() => setUnits('metric')}
              >
                Metric (kg/cm)
              </button>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" value={inputs.age || ''} onChange={handleInputChange} min="15" max="95" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" value={inputs.gender} onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="weight">{units === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}</label>
                <input type="number" id="weight" value={inputs.weight || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>{units === 'imperial' ? 'Height (ft/in)' : 'Height (cm)'}</label>
                {units === 'imperial' ? (
                  <div className="grid-2">
                    <input type="number" id="heightFt" value={inputs.heightFt || ''} onChange={handleInputChange} placeholder="ft" />
                    <input type="number" id="heightIn" value={inputs.heightIn || ''} onChange={handleInputChange} placeholder="in" />
                  </div>
                ) : (
                  <input type="number" id="heightCm" value={inputs.heightCm || ''} onChange={handleInputChange} placeholder="cm" />
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="activity">Activity Level</label>
              <select id="activity" value={inputs.activity} onChange={handleInputChange}>
                <option value="1.2">Sedentary (Office job)</option>
                <option value="1.375">Light (1-2 days/week)</option>
                <option value="1.55">Moderate (3-5 days/week)</option>
                <option value="1.725">Active (6-7 days/week)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preference">Food Preference</label>
              <select id="preference" value={inputs.preference} onChange={handleInputChange}>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="veg">Vegetarian</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prepTime">Prep Time</label>
              <select id="prepTime" value={inputs.prepTime} onChange={handleInputChange}>
                <option value="quick">Quick & Easy (15-20m)</option>
                <option value="traditional">Traditional (Full Prep)</option>
              </select>
            </div>

            <button className="btn-primary" onClick={generatePlan}>Create My Plan</button>
          </div>
        ) : (
          <div className="results-section">
            <div className="stat-card">
              <span className="stat-label">Daily Calorie Target</span>
              <span className="stat-val">{results.targetCalories}</span>
              <span className="stat-label">For Sustainable Fat Loss</span>
            </div>

            <div className="card">
              <div className="shuffle-bar">
                <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>Today's Meal Plan</h2>
                <button className="btn-shuffle" onClick={shuffleMeals}>Shuffle</button>
              </div>

              <div className="meal-list">
                {Object.entries(meals).map(([type, meal]) => (
                  <div key={type} className="meal-item">
                    <span className="meal-tag">{type.toUpperCase()} • {meal.tags[0]}</span>
                    <span className="meal-title">{meal.title}</span>
                    <span className="meal-desc">{meal.desc}</span>
                  </div>
                ))}
              </div>

              <div className="water-intake">
                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>DAILY WATER TARGET</p>
                <span className="water-val">{results.waterL} L ({results.waterGal} Gal)</span>
              </div>

              <button className="btn-primary" style={{ background: '#EEEEEE', color: 'var(--text-main)', marginTop: '24px' }} onClick={() => setShowResults(false)}>Edit Details</button>
            </div>
          </div>
        )}
      </main>

      <footer>
        &copy; 2026 DietEase USA. Designed for the Kerala Diaspora.<br />
        Traditional flavors, healthy habits.
      </footer>
    </div>
  );
}

export default App;
