import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { Task } from "./components/TaskItem";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

export function MainLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuthState = () => {
      const sessionUser = sessionStorage.getItem("loggedInUser");

      if (!sessionUser) {
        setIsLoggedIn(false);
        setCurrentUserEmail(null);
        setTasks([]);
        return;
      }

      try {
        const parsedUser = JSON.parse(sessionUser) as { email?: string };
        const email = parsedUser.email ?? null;

        if (!email) {
          setIsLoggedIn(false);
          setCurrentUserEmail(null);
          setTasks([]);
          return;
        }

        setIsLoggedIn(true);
        setCurrentUserEmail(email);
      } catch {
        setIsLoggedIn(false);
        setCurrentUserEmail(null);
        setTasks([]);
      }
    };

    syncAuthState();

    const handleStorageOrAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener("storage", handleStorageOrAuthChange);
    window.addEventListener("loginStatusChange", handleStorageOrAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageOrAuthChange);
      window.removeEventListener("loginStatusChange", handleStorageOrAuthChange);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !currentUserEmail) {
      setTasks([]);
      return;
    }

    const userTaskStorageKey = `tasks_${currentUserEmail}`;
    const savedTasks = localStorage.getItem(userTaskStorageKey);

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks) as Task[]);
      } catch {
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, [isLoggedIn, currentUserEmail]);

  useEffect(() => {
    if (!isLoggedIn || !currentUserEmail) {
      return;
    }

    const userTaskStorageKey = `tasks_${currentUserEmail}`;
    localStorage.setItem(userTaskStorageKey, JSON.stringify(tasks));
  }, [tasks, isLoggedIn, currentUserEmail]);

  useEffect(() => {
    const state = location.state as { openLogin?: boolean } | null;

    if (location.pathname === "/" && state?.openLogin) {
      setIsLoginModalOpen(true);
      navigate("/", { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const addTask = (title: string, description: string, data: string, category: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      data,
      category,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    toast.success("Task added successfully!");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((t) => t.id === id);
    if (task) {
      toast.success(task.completed ? "Task marked as pending" : "Task completed!");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const updateTask = (id: string, title: string, description: string, data: string, category: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description, data, category } : task
      )
    );
    toast.success("Task updated successfully!");
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const userData = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    setIsRegisterModalOpen(false);
    toast.success("Registration successful! Please login.");
  };

  const handleLogin = (email: string, password: string) => {
    const registeredUser = localStorage.getItem("registeredUser");
    
    if (!registeredUser) {
      toast.error("No registered user found. Please register first.");
      return;
    }

    const user = JSON.parse(registeredUser);
    const normalizedEmail = email.trim().toLowerCase();
    const sessionUser = { ...user, email: normalizedEmail };

    sessionStorage.setItem("loggedInUser", JSON.stringify(sessionUser));
    setIsLoggedIn(true);
    setCurrentUserEmail(normalizedEmail);
    setTasks([]);
    setEditingTask(null);
    setIsLoginModalOpen(false);
    toast.success(`Welcome back, ${user.name}!`);
    // Dispatch custom event to notify Navbar
    window.dispatchEvent(new Event("loginStatusChange"));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setTasks([]);
    setEditingTask(null);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    window.dispatchEvent(new Event("loginStatusChange"));
    navigate("/", { replace: true });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  // Determine which page component to render and pass appropriate props
  const renderPage = () => {
    const pathname = location.pathname;

    if (pathname === "/") {
      return (
        <Outlet
          context={{
            isLoggedIn,
            onLoginClick: () => setIsLoginModalOpen(true),
            onRegisterClick: () => setIsRegisterModalOpen(true),
          }}
        />
      );
    } else if (pathname === "/task") {
      return (
        <Outlet
          context={{
            tasks,
            onAddTask: addTask,
            onToggleComplete: toggleComplete,
            onDelete: deleteTask,
            onEditTask: updateTask,
            editingTask,
            setEditingTask,
          }}
        />
      );
    } else if (pathname === "/filtering") {
      return (
        <Outlet
          context={{
            tasks,
            onToggleComplete: toggleComplete,
            onDelete: deleteTask,
            setEditingTask,
            navigate,
          }}
        />
      );
    } else if (pathname === "/dashboard") {
      return (
        <Outlet
          context={{
            totalTasks,
            completedTasks,
            pendingTasks,
          }}
        />
      );
    }

    return <Outlet />;
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar
          onLoginClick={() => setIsLoginModalOpen(true)}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          {renderPage()}
        </main>

        <Footer />

        {/* Modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </div>
    </>
  );
}
