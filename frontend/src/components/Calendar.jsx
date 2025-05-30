import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Q2 OKR Review",
      type: "review",
      date: new Date(2024, 6, 15),
      time: "10:00 AM",
      description: "Quarterly review meeting for all team OKRs",
    },
    {
      id: "2",
      title: "Product Launch Deadline",
      type: "deadline",
      date: new Date(2024, 6, 20),
      time: "11:59 PM",
      description: "Final deadline for product launch OKR",
    },
    {
      id: "3",
      title: "Weekly Team Check-in",
      type: "checkin",
      date: new Date(2024, 6, 18),
      time: "2:00 PM",
      description: "Weekly progress update meeting",
    },
    {
      id: "4",
      title: "Marketing Milestone",
      type: "milestone",
      date: new Date(2024, 6, 25),
      time: "9:00 AM",
      description: "Reach 10K social media followers",
    },
  ]);

  // For showing/hiding the Add Event form
  const [showAddEvent, setShowAddEvent] = useState(false);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "review",
    date: "",
    time: "",
    description: "",
  });

  const getEventTypeColor = (type) => {
    switch (type) {
      case "deadline":
        return "background: #ffcccc; color: #a00;";
      case "review":
        return "background: #cce5ff; color: #004085;";
      case "checkin":
        return "background: #d4edda; color: #155724;";
      case "milestone":
        return "background: #e2d4f0; color: #4b0082;";
      default:
        return "background: #eee; color: #333;";
    }
  };

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1
      )
    );
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          style={{
            height: 120,
            border: "1px solid #444",
            backgroundColor: "#000",
          }}
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === day &&
          event.date.getMonth() === currentDate.getMonth() &&
          event.date.getFullYear() === currentDate.getFullYear()
      );

      days.push(
        <div
          key={day}
          style={{
            height: 120,
            border: "1px solid #444",
            padding: 8,
            backgroundColor: "#111",
            color: "#eee",
            cursor: "default",
          }}
          title={dayEvents.length ? dayEvents.map((e) => e.title).join(", ") : ""}
        >
          <div style={{ fontWeight: "600", marginBottom: 8 }}>{day}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                style={{
                  fontSize: 12,
                  padding: "2px 4px",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  ...parseCssStyle(getEventTypeColor(event.type)),
                }}
                title={`${event.title} (${event.time || "All day"})`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div style={{ fontSize: 12, color: "#888" }}>
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  // Helper to parse inline style string to object
  const parseCssStyle = (styleString) => {
    return styleString.split(";").reduce((acc, curr) => {
      const [key, value] = curr.split(":").map((s) => s && s.trim());
      if (key && value) {
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc[camelKey] = value;
      }
      return acc;
    }, {});
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add new event
  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.date || !newEvent.type) {
      alert("Please fill in the Title, Date, and Type fields.");
      return;
    }

    // Create a new event object
    const eventToAdd = {
      id: (events.length + 1).toString(),
      title: newEvent.title,
      type: newEvent.type,
      date: new Date(newEvent.date),
      time: newEvent.time,
      description: newEvent.description,
    };

    setEvents((prev) => [...prev, eventToAdd]);
    setShowAddEvent(false);
    setNewEvent({
      title: "",
      type: "review",
      date: "",
      time: "",
      description: "",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#eee",
        padding: 24,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, fontWeight: "bold" }}>Calendar</h1>
          <p style={{ color: "#aaa", marginTop: 8 }}>
            Track OKR deadlines, reviews, and milestones
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#111",
              borderRadius: 8,
              padding: 4,
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setViewMode("month")}
              style={{
                backgroundColor: viewMode === "month" ? "#555" : "transparent",
                border: "none",
                color: "#eee",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              style={{
                backgroundColor: viewMode === "week" ? "#555" : "transparent",
                border: "none",
                color: "#eee",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              Week
            </button>
          </div>
          <button
            style={{
              backgroundColor: "#222",
              color: "#eee",
              border: "1px solid #444",
              borderRadius: 6,
              padding: "8px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={() => setShowAddEvent(true)}
            aria-label="Add Event"
          >
            <span style={{ fontWeight: "bold", fontSize: 18 }}>+</span> Add Event
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
        }}
      >
        {/* Calendar + Navigation */}
        <div>
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#eee",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span role="img" aria-label="calendar" style={{ fontSize: 20 }}>
                📅
              </span>
              <h2 style={{ margin: 0, fontWeight: "600" }}>
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => navigateMonth("prev")}
                style={navButtonStyle}
                aria-label="Previous Month"
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                style={navButtonStyle}
                aria-label="Today"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth("next")}
                style={navButtonStyle}
                aria-label="Next Month"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              color: "#888",
              borderBottom: "1px solid #444",
              paddingBottom: 8,
            }}
          >
            {daysOfWeek.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  userSelect: "none",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0,
              marginTop: 4,
            }}
          >
            {renderCalendarGrid()}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Upcoming Events */}
          <SectionCard title="⏰ Upcoming Events">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  style={{
                    backgroundColor: "#111",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                    color: "#eee",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <strong style={{ fontSize: 14, flexGrow: 1 }}>
                      {event.title}
                    </strong>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "2px 6px",
                        borderRadius: 4,
                        ...parseCssStyle(getEventTypeColor(event.type)),
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>
                    {event.date.toLocaleDateString()}{" "}
                    {event.time ? `at ${event.time}` : ""}
                  </div>
                  {event.description && (
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
          </SectionCard>

          {/* Event Types Legend */}
          <SectionCard title="Event Types">
            <LegendItem color="#ffcccc" label="Deadlines" />
            <LegendItem color="#cce5ff" label="Reviews" />
            <LegendItem color="#d4edda" label="Check-ins" />
            <LegendItem color="#e2d4f0" label="Milestones" />
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard title="Quick Actions">
            <ActionButton emoji="🎯" label="Schedule OKR Review" />
            <ActionButton emoji="⏰" label="Set Deadline" />
            <ActionButton emoji="📅" label="Weekly Check-in" />
          </SectionCard>
        </div>
      </div>

      {/* Add Event Modal/Form */}
      {showAddEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: 24,
          }}
          onClick={() => setShowAddEvent(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddEvent}
            style={{
              backgroundColor: "#111",
              padding: 24,
              borderRadius: 12,
              maxWidth: 400,
              width: "100%",
              color: "#eee",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Add New Event</h2>
            <label>
              Title*:
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
                style={inputStyle}
                placeholder="Event title"
              />
            </label>
            <label>
              Type*:
              <select
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                required
                style={inputStyle}
              >
                <option value="review">Review</option>
                <option value="deadline">Deadline</option>
                <option value="checkin">Check-in</option>
                <option value="milestone">Milestone</option>
              </select>
            </label>
            <label>
              Date*:
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Additional details"
              />
            </label>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button
                type="button"
                onClick={() => setShowAddEvent(false)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#444",
                  color: "#eee",
                }}
              >
                Cancel
              </button>
              <button type="submit" style={buttonStyle}>
                Add Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <section
    style={{
      backgroundColor: "#111",
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    }}
  >
    <h3 style={{ marginTop: 0, marginBottom: 16, color: "#bbb" }}>{title}</h3>
    {children}
  </section>
);

const LegendItem = ({ color, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
      color: "#eee",
    }}
  >
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: color,
        border: "1px solid #444",
      }}
    />
    <span>{label}</span>
  </div>
);

const ActionButton = ({ emoji, label }) => (
  <button
    type="button"
    style={{
      width: "100%",
      backgroundColor: "#222",
      color: "#eee",
      border: "none",
      borderRadius: 8,
      padding: "10px 0",
      marginBottom: 12,
      cursor: "pointer",
      fontWeight: "600",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      userSelect: "none",
      transition: "background-color 0.3s",
    }}
    onClick={() => alert(`Action: ${label}`)}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#222")}
  >
    <span>{emoji}</span> {label}
  </button>
);

const navButtonStyle = {
  backgroundColor: "#222",
  color: "#eee",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 14,
};

const inputStyle = {
  width: "100%",
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #444",
  backgroundColor: "#222",
  color: "#eee",
  fontSize: 14,
  marginTop: 4,
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#0a84ff",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 14,
};

export default Calendar;
