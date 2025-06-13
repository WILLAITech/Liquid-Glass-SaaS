export interface MockTransformResult {
  id: string;
  name: string;
  description: string;
  category: 'dashboard' | 'ecommerce' | 'mobile' | 'form' | 'card';
  frameworks: {
    react: string;
    vue: string;
    css: string;
  };
  preview: string;
}

export const mockTransformResults: MockTransformResult[] = [
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    description: 'Modern analytics dashboard with liquid glass cards and data visualization',
    category: 'dashboard',
    frameworks: {
      react: `import React from 'react';
import './LiquidGlass.css';

const AnalyticsDashboard = () => {
  return (
    <div className="liquid-glass-container">
      <div className="dashboard-grid">
        <div className="glass-card metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3 className="metric-value">24,596</h3>
            <p className="metric-label">Total Users</p>
            <span className="metric-change positive">+12.5%</span>
          </div>
        </div>
        
        <div className="glass-card metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3 className="metric-value">$89,432</h3>
            <p className="metric-label">Revenue</p>
            <span className="metric-change positive">+8.2%</span>
          </div>
        </div>
        
        <div className="glass-card chart-card">
          <h4 className="chart-title">Performance Overview</h4>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="bar" style={{height: '60%'}}></div>
              <div className="bar" style={{height: '80%'}}></div>
              <div className="bar" style={{height: '45%'}}></div>
              <div className="bar" style={{height: '90%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;`,
      vue: `<template>
  <div class="liquid-glass-container">
    <div class="dashboard-grid">
      <div class="glass-card metric-card">
        <div class="metric-icon">📊</div>
        <div class="metric-content">
          <h3 class="metric-value">{{ metrics.users }}</h3>
          <p class="metric-label">Total Users</p>
          <span class="metric-change positive">+12.5%</span>
        </div>
      </div>
      
      <div class="glass-card metric-card">
        <div class="metric-icon">💰</div>
        <div class="metric-content">
          <h3 class="metric-value">{{ metrics.revenue }}</h3>
          <p class="metric-label">Revenue</p>
          <span class="metric-change positive">+8.2%</span>
        </div>
      </div>
      
      <div class="glass-card chart-card">
        <h4 class="chart-title">Performance Overview</h4>
        <div class="chart-placeholder">
          <div class="chart-bars">
            <div v-for="(height, index) in chartData" 
                 :key="index" 
                 class="bar" 
                 :style="{height: height + '%'}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsDashboard',
  data() {
    return {
      metrics: {
        users: '24,596',
        revenue: '$89,432'
      },
      chartData: [60, 80, 45, 90]
    }
  }
}
</script>`,
      css: `/* Analytics Dashboard Liquid Glass Styles */
.liquid-glass-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.metric-icon {
  font-size: 3rem;
  opacity: 0.8;
}

.metric-value {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.metric-label {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.5rem 0;
}

.metric-change {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.metric-change.positive {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.chart-card {
  grid-column: span 2;
}

.chart-title {
  color: white;
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 200px;
}

.bar {
  background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
  border-radius: 8px;
  flex: 1;
  transition: all 0.3s ease;
}

.bar:hover {
  background: linear-gradient(to top, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
}`
    },
    preview: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 800px; margin: 0 auto;">
          <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2rem;">📊</div>
            <div>
              <h3 style="color: white; font-size: 1.5rem; margin: 0 0 0.25rem 0;">24,596</h3>
              <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.875rem;">Total Users</p>
            </div>
          </div>
          <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2rem;">💰</div>
            <div>
              <h3 style="color: white; font-size: 1.5rem; margin: 0 0 0.25rem 0;">$89,432</h3>
              <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.875rem;">Revenue</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'ecommerce-product',
    name: 'Product Card',
    description: 'E-commerce product card with glass morphism effects',
    category: 'ecommerce',
    frameworks: {
      react: `import React, { useState } from 'react';
import './LiquidGlass.css';

const ProductCard = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="liquid-glass-container">
      <div className="product-card glass-card">
        <div className="product-image">
          <div className="image-placeholder">
            <span>📱</span>
          </div>
          <button 
            className="like-button"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="product-info">
          <h3 className="product-title">iPhone 15 Pro</h3>
          <p className="product-description">
            Latest iPhone with titanium design and advanced camera system
          </p>
          
          <div className="product-rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-count">(128 reviews)</span>
          </div>
          
          <div className="product-pricing">
            <span className="current-price">$999</span>
            <span className="original-price">$1,199</span>
          </div>
          
          <button className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;`,
      vue: `<template>
  <div class="liquid-glass-container">
    <div class="product-card glass-card">
      <div class="product-image">
        <div class="image-placeholder">
          <span>📱</span>
        </div>
        <button 
          class="like-button"
          @click="toggleLike"
        >
          {{ isLiked ? '❤️' : '🤍' }}
        </button>
      </div>
      
      <div class="product-info">
        <h3 class="product-title">iPhone 15 Pro</h3>
        <p class="product-description">
          Latest iPhone with titanium design and advanced camera system
        </p>
        
        <div class="product-rating">
          <span class="stars">⭐⭐⭐⭐⭐</span>
          <span class="rating-count">(128 reviews)</span>
        </div>
        
        <div class="product-pricing">
          <span class="current-price">\${{ product.price }}</span>
          <span class="original-price">\${{ product.originalPrice }}</span>
        </div>
        
        <button class="add-to-cart-btn" @click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data() {
    return {
      isLiked: false,
      product: {
        price: 999,
        originalPrice: 1199
      }
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    addToCart() {
      console.log('Added to cart');
    }
  }
}
</script>`,
      css: `/* Product Card Liquid Glass Styles */
.liquid-glass-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card {
  max-width: 350px;
  overflow: hidden;
}

.product-image {
  position: relative;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-bottom: 1.5rem;
}

.image-placeholder {
  font-size: 4rem;
  opacity: 0.6;
}

.like-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.product-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.product-description {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating-count {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.current-price {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.original-price {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
  transform: translateY(-2px);
}`
    },
    preview: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 24px; padding: 2rem; max-width: 300px;">
          <div style="height: 150px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); border-radius: 16px; margin-bottom: 1.5rem; font-size: 3rem;">
            📱
          </div>
          <h3 style="color: white; font-size: 1.25rem; margin: 0 0 0.5rem 0;">iPhone 15 Pro</h3>
          <p style="color: rgba(255, 255, 255, 0.7); margin: 0 0 1rem 0; font-size: 0.875rem;">Latest iPhone with titanium design</p>
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <span style="color: white; font-size: 1.25rem; font-weight: 700;">$999</span>
            <span style="color: rgba(255, 255, 255, 0.5); text-decoration: line-through;">$1,199</span>
          </div>
          <button style="width: 100%; padding: 1rem; background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; color: white; font-weight: 600; cursor: pointer;">Add to Cart</button>
        </div>
      </div>
    `
  },
  {
    id: 'login-form',
    name: 'Login Form',
    description: 'Modern login form with glass morphism styling',
    category: 'form',
    frameworks: {
      react: `import React, { useState } from 'react';
import './LiquidGlass.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="liquid-glass-container">
      <div className="login-form glass-card">
        <div className="form-header">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="glass-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="glass-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          
          <button type="submit" className="submit-btn">
            Sign In
          </button>
          
          <p className="signup-prompt">
            Don't have an account? <a href="#" className="signup-link">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;`,
      vue: `<template>
  <div class="liquid-glass-container">
    <div class="login-form glass-card">
      <div class="form-header">
        <h2 class="form-title">Welcome Back</h2>
        <p class="form-subtitle">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="input-group">
          <label class="input-label">Email Address</label>
          <input
            type="email"
            class="glass-input"
            placeholder="Enter your email"
            v-model="formData.email"
          />
        </div>
        
        <div class="input-group">
          <label class="input-label">Password</label>
          <input
            type="password"
            class="glass-input"
            placeholder="Enter your password"
            v-model="formData.password"
          />
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe">
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>
        
        <button type="submit" class="submit-btn">
          Sign In
        </button>
        
        <p class="signup-prompt">
          Don't have an account? <a href="#" class="signup-link">Sign up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      rememberMe: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('Login attempt:', this.formData);
    }
  }
}
</script>`,
      css: `/* Login Form Liquid Glass Styles */
.liquid-glass-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  max-width: 400px;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.form-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.glass-input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.glass-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.forgot-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.submit-btn:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
  transform: translateY(-2px);
}

.signup-prompt {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.signup-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
}`
    },
    preview: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 24px; padding: 2rem; max-width: 350px; width: 100%;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="color: white; font-size: 1.5rem; margin: 0 0 0.5rem 0;">Welcome Back</h2>
            <p style="color: rgba(255, 255, 255, 0.7); margin: 0;">Sign in to your account</p>
          </div>
          <div style="margin-bottom: 1rem;">
            <input type="email" placeholder="Enter your email" style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; color: white; margin-bottom: 1rem;" />
            <input type="password" placeholder="Enter your password" style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; color: white;" />
          </div>
          <button style="width: 100%; padding: 1rem; background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 12px; color: white; font-weight: 600; cursor: pointer;">Sign In</button>
        </div>
      </div>
    `
  }
];

// Intelligently select appropriate mock result based on uploaded image
export function getMockResultForImage(imageData: string): MockTransformResult {
  // Can select appropriate mock result based on image content, filename, etc.
  // Currently selects one randomly
  const randomIndex = Math.floor(Math.random() * mockTransformResults.length);
  return mockTransformResults[randomIndex];
}

// Get mock result by category
export function getMockResultByCategory(category: string): MockTransformResult {
  const result = mockTransformResults.find(item => item.category === category);
  return result || mockTransformResults[0];
} 