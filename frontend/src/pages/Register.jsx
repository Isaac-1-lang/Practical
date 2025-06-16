import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    businessArena: '',
    employees: '',
    street: '',
    additionalInfo: '',
    zipCode: '',
    place: '',
    country: '',
    phoneCode: '',
    phoneNumber: '',
    email: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Registration successful!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.formGrid}>
          {/* Left Side - General Information */}
          <div style={styles.leftPanel}>
            <h2 style={styles.leftTitle}>General Information</h2>
            
            <div style={styles.inputGroup}>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Title</option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
                <option value="dr">Dr.</option>
              </select>
            </div>

            <div style={styles.rowGroup}>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.firstName ? styles.inputError : {})
                  }}
                />
                {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}
              </div>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.lastName ? styles.inputError : {})
                  }}
                />
                {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Position</option>
                <option value="ceo">CEO</option>
                <option value="cto">CTO</option>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.rowGroup}>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="businessArena"
                  placeholder="Business Arena"
                  value={formData.businessArena}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.halfWidth}>
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Employees</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Details */}
          <div style={styles.rightPanel}>
            <h2 style={styles.rightTitle}>Contact Details</h2>
            
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="street"
                placeholder="Street + Nr"
                value={formData.street}
                onChange={handleChange}
                style={styles.glassMorphInput}
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                name="additionalInfo"
                placeholder="Additional Information"
                value={formData.additionalInfo}
                onChange={handleChange}
                style={styles.glassMorphInput}
              />
            </div>

            <div style={styles.rowGroup}>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  style={styles.glassMorphInput}
                />
              </div>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="place"
                  placeholder="Place"
                  value={formData.place}
                  onChange={handleChange}
                  style={styles.glassMorphInput}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                style={styles.glassMorphInput}
              />
            </div>

            <div style={styles.rowGroup}>
              <div style={styles.halfWidth}>
                <input
                  type="text"
                  name="phoneCode"
                  placeholder="Code +"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  style={styles.glassMorphInput}
                />
              </div>
              <div style={styles.halfWidth}>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  style={styles.glassMorphInput}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.glassMorphInput,
                  ...(errors.email ? styles.glassMorphInputError : {})
                }}
              />
              {errors.email && <p style={styles.errorTextWhite}>{errors.email}</p>}
            </div>

            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label style={styles.checkboxLabel}>
                I do accept the{' '}
                <a href="#" style={styles.link}>
                  Terms and Conditions
                </a>{' '}
                of your site.
              </label>
            </div>
            {errors.acceptTerms && <p style={styles.errorTextWhite}>{errors.acceptTerms}</p>}

            <button
              type="submit"
              onClick={handleSubmit}
              style={styles.submitButton}
            >
              Register Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #87CEEB 0%, #6fa8dc 25%, #5b9bd5 50%, #4472c4 75%, #6b46c1 100%)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  formWrapper: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '600px'
  },
  leftPanel: {
    padding: '32px',
    backgroundColor: '#f9fafb'
  },
  rightPanel: {
    padding: '32px',
    background: 'linear-gradient(135deg, #6b46c1 0%, #4338ca 100%)',
    color: 'white'
  },
  leftTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '32px',
    margin: '0 0 32px 0'
  },
  rightTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '32px',
    margin: '0 0 32px 0'
  },
  inputGroup: {
    marginBottom: '24px'
  },
  rowGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  halfWidth: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  glassMorphInput: {
    width: '100%',
    padding: '12px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  glassMorphInputError: {
    borderColor: 'rgba(239, 68, 68, 0.8)'
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '24px'
  },
  checkbox: {
    marginTop: '4px',
    width: '16px',
    height: '16px',
    accentColor: '#3b82f6'
  },
  checkboxLabel: {
    fontSize: '14px',
    lineHeight: '1.4',
    color: 'white'
  },
  link: {
    textDecoration: 'underline',
    color: 'white',
    cursor: 'pointer'
  },
  submitButton: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '200px',
    width: '100%',
    backgroundColor: 'white',
    color: '#6b46c1',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  errorText: {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  },
  errorTextWhite: {
    color: '#fca5a5',
    fontSize: '12px',
    marginTop: '4px'
  }
};

// Add hover effects and responsive design
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.formGrid.gridTemplateColumns = '1fr';
  styles.rowGroup.gridTemplateColumns = '1fr';
}

export default RegistrationForm;