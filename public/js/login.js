export const login = async (email, password) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (response.data.status === 'success') {
      //   showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
    }
  } catch (err) {
    // ShowAlert('error', error.response.data.message);
    aler('error');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.assign('/login');
    }
  } catch (err) {
    // showAlert('error', 'Error loggin out!!');
    alert('Error');
  }
};

export const addTask = async (taskName) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/tasks',
      data: {
        name: taskName,
      },
    });
    if (res.data.status === 'success') {
      location.assign('/home');
    }
  } catch (err) {
    alert('Error');
  }
};

export const removeTask = async (taskName) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/tasks',
      data: {
        name: taskName,
      },
    });

    location.assign('/home');
  } catch (err) {
    alert('Error');
  }
};

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      //   showAlert('success', 'Logged in successfully');
      location.assign('/home');
    }
  } catch (err) {
    console.log(err);
    alert('Error');
  }
};
