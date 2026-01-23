// Dummy API service for authentication
// This simulates API calls with mock responses

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "John Doe"
  },
  {
    id: "2",
    email: "admin@caarzy.com",
    password: "admin123",
    name: "Admin User"
  }
];

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      return {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token: `mock-jwt-token-${user.id}-${Date.now()}`
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password"
      };
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    await delay(1500); // Simulate network delay

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists"
      };
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      name: userData.email.split('@')[0] // Use email prefix as name
    };

    // Add to mock database
    mockUsers.push(newUser);

    return {
      success: true,
      message: "Registration successful",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`
    };
  }
};