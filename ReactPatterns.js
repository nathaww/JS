// 1. Container-Presenter Pattern
// Overview: Separate logic (state management) from rendering.
// Container components handle data fetching, state management, 
// and pass props to Presenter components that are responsible for rendering.
// Use Case: Large applications with complex logic and UIs.

// Container
const UserContainer = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return <UsersList users={users} />;
};

// Presenter
const UsersList = ({ users }) => (
    <ul>
        {users.map((user) => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
);

// 2. Higher-Order Components (HOC)
// Overview: A function that takes a component and returns an enhanced version of that component.
// Use Case: Reuse component logic, especially for concerns like authentication, theming, or tracking.

const withLogging = (Component) => (props) => {
    useEffect(() => {
        console.log("Component mounted");
    }, []);

    return <Component {...props} />;
};

// const UserComponent = withLogging(User);
// 3. Render Props
// Overview: Pass a function as a prop to a component, allowing you to customize what gets rendered.
// Use Case: Share functionality across components without using HOCs.

const MouseTracker = ({ render }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });

    return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
};

const App = () => (
    <MouseTracker render={({ x, y }) => <h1>Mouse at ({x}, {y})</h1>} />
);
// 4. Custom Hooks
// Overview: Encapsulate reusable logic within a custom hook for reuse across multiple components.
// Use Case: Shared logic like API calls, form handling, or theme management.

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url).then((response) => response.json()).then(setData);
    }, [url]);

    return data;
};

const UserList = () => {
    const users = useFetch("/api/users");

    return (
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};
// 5. Controlled vs. Uncontrolled Components
// Overview: Controlled components manage their state directly through React; uncontrolled components use refs.
// Use Case: Controlled components are ideal for forms where every change needs to be captured in the React state. Use uncontrolled components when you don't need every change logged.

// Controlled
const ControlledInput = () => {
    const [value, setValue] = useState("");

    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};

// Uncontrolled
const UncontrolledInput = () => {
    const inputRef = useRef(null);

    return <input ref={inputRef} />;
};
// 6. Compound Components
// Overview: A pattern where components work together, allowing flexibility in defining how they render.
// Use Case: Design complex components like forms or modals where each child has specialized functionality.

const Tabs = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { isActive: index === activeIndex, onSelect: () => setActiveIndex(index) });
    });
};

const Tab = ({ isActive, onSelect, children }) => (
    <div onClick={onSelect} style={{ fontWeight: isActive ? "bold" : "normal" }}>
        {children}
    </div>
);

const App = () => (
    <Tabs>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
    </Tabs>
);
// 7. Controlled Rendering (Conditional Rendering)
// Overview: Display components based on a condition.
// Use Case: Render different UIs for different states, such as loading spinners, errors, or empty states.

const UserProfile = ({ user }) => {
    if (!user) return <p>Loading...</p>;
    if (!user.name) return <p>User not found.</p>;

    return <h1>Welcome, {user.name}</h1>;
};

// 8. Render-as-You-Fetch (for Concurrent Mode)
// Overview: Optimize loading experience by initiating data fetching at the top level or immediately after user interactions.
// Use Case: Improve perceived performance in user interfaces by reducing wait times.

function App() {
    const resource = fetchUserData();
    return (
        <Suspense fallback={<Spinner />}>
            <ProfilePage resource={resource} />
        </Suspense>
    );
}

// React patterns like these help make code modular, scalable, and optimized for both performance and readability.
//  Each can be adapted based on project needs.