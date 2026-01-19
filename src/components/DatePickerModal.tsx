import React, { useEffect, useMemo, useState } from "react";

type DatePickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getMonthDays(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  const jsDay = firstDay.getDay(); // 0–6 (Sun–Sat)
  const mondayBased = (jsDay + 6) % 7;

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < mondayBased; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return days;
}

const arrowStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: "#2C2C2E",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  cursor: "pointer",
  userSelect: "none",
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onDateSelected,
}) => {
  // ОТКРЫВАЕМ КАЛЕНДАРЬ НА ТЕКУЩЕЙ ДАТЕ ПОЛЬЗОВАТЕЛЯ (год+месяц)
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // каждый раз при открытии — сбрасываем выделение и ставим текущий месяц/год
  useEffect(() => {
    if (isOpen) {
      setViewDate(new Date());
      setSelectedDate(null); // чтобы ничего не подсвечивалось с прошлого раза
    }
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const monthIndex = viewDate.getMonth();

  const days = useMemo(() => getMonthDays(year, monthIndex), [year, monthIndex]);

  if (!isOpen) return null;

  const goPrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(23,21,19,0.1)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        zIndex: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 375,
          height: 420,
          backgroundColor: "#1C1C1E",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div onClick={goPrevMonth} style={arrowStyle}>
            ‹
          </div>

          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 17,
              color: "#FFFFFF",
            }}
          >
            {MONTH_NAMES[monthIndex]} {year}
          </div>

          <div onClick={goNextMonth} style={arrowStyle}>
            ›
          </div>
        </div>

        {/* WEEK DAYS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 8,
          }}
        >
          {WEEK_DAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#8E8E93",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* DAYS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
          }}
        >
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => {
                if (!day) return;
                const date = new Date(year, monthIndex, day);
                setSelectedDate(date); // можно оставить, но визуально не используем
                onDateSelected(date);
              }}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 0,
                backgroundColor: "transparent", // НИКАКОЙ ПОДСВЕТКИ
                color: "#FFFFFF",
                opacity: day ? 1 : 0,
                cursor: day ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;