import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem("gk_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_events", JSON.stringify(events));
    }
  }, [events, loading]);

  const handleRegister = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === id && evt.registered < evt.capacity
          ? { ...evt, registered: evt.registered + 1 }
          : evt
      )
    );
  };

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((evt) => evt.id !== id));
  };

  const handleAddEvent = (newEvent) => {
    const maxId = events.length > 0 ? Math.max(...events.map((e) => e.id)) : 0;
    const eventToAdd = {
      ...newEvent,
      id: maxId + 1,
      registered: 0,
    };
    setEvents((prevEvents) => [...prevEvents, eventToAdd]);
  };

  if (loading) {
    return (
      <Layout>
        <div>Đang tải...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>Không tải được dữ liệu</div>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home events={events} />} />
        <Route
          path="events"
          element={
            <EventList
              events={events}
              onRegister={handleRegister}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="events/new"
          element={<AddEvent onAddEvent={handleAddEvent} />}
        />
        <Route
          path="events/:id"
          element={<EventDetail events={events} />}
        />
      </Route>
    </Routes>
  );
};

export default App;