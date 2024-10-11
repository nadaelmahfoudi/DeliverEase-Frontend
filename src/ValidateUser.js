function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'L\'email est requis';
    } else if (!emailRegex.test(email)) {
      return 'L\'email est invalide';
    }
    return null;
  }
  
  function validatePassword(password) {
    if (!password) {
      return 'Le mot de passe est requis';
    } else if (password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return null;
  }
  
  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return 'Le numéro de téléphone est invalide';
    }
    return null;
  }
    
  function validateUser(data) {
    const errors = {};
  
    // Valider chaque champ
    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;
  
    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;
  
    const phoneNumberError = validatePhoneNumber(data.phoneNumber);
    if (phoneNumberError) errors.phoneNumber = phoneNumberError;
    
    return errors;
  }
  
  export default validateUser;
  