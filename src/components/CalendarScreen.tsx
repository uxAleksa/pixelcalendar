import { useState } from "react";
import ColorLegend from "./ColorLegend";
import ColorPickerModal from "./ColorPickerModal";
import DatePickerModal from "./DatePickerModal";
import { MOOD_COLORS } from "../constants/colors";

type CellData = {
  colorKey: string;
  message: string;
  date: Date;
};

function CalendarScreen() {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const rowsPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const [selectedCell, setSelectedCell] =
    useState<{ month: number; day: number } | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [cellData, setCellData] = useState<Record<string, CellData>>({});

  return (
    <div
      style={{
        width: 375,
        height: 812,
        margin: "0 auto",
        position: "relative",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* ТЁМНОЕ ПОЛЕ */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 16,
          width: 276,
          height: 656,
          backgroundColor: "#040404",
          borderRadius: 8,
        }}
      >
        {/* МЕСЯЦЫ */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 26,
            display: "flex",
            gap: 2,
          }}
        >
          {months.map((m, i) => (
            <div
              key={i}
              style={{
                width: 18,
                textAlign: "center",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 8,
                color: "#B7B7B7",
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* НУМЕРАЦИЯ */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 18,
                width: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 8,
                color: "#B7B7B7",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* СЕТКА (ТОЛЬКО ВИЗУАЛ) */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            display: "flex",
            gap: 2,
            pointerEvents: "none",
          }}
        >
          {rowsPerMonth.map((rows, colIndex) => (
            <div
              key={colIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {Array.from({ length: rows }).map((_, rowIndex) => {
                const day = rowIndex + 1;
                const cellKey = `${colIndex}-${day}`;
                const data = cellData[cellKey];

                const color = data
                  ? MOOD_COLORS.find(c => c.key === data.colorKey)?.color
                  : "#161818";

                return (
                  <div
                    key={rowIndex}
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: color,
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* INVISIBLE OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedCell({ month: 0, day: 1 });
            setIsDatePickerOpen(true);
          }}
        />
      </div>

      <ColorLegend />

      {/* DATE PICKER */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => {
          setIsDatePickerOpen(false);
          setSelectedCell(null);
        }}
        onDateSelected={(date) => {
          setSelectedDate(date);
          setIsDatePickerOpen(false);
          setIsColorModalOpen(true);
        }}
      />

      {/* COLOR PICKER */}
      <ColorPickerModal
        isOpen={isColorModalOpen}
        onClose={() => {
          setIsColorModalOpen(false);
          setSelectedCell(null);
          setSelectedDate(null);
        }}
        onSave={(colorKey, message) => {
          if (!selectedDate) return;

          const month = selectedDate.getMonth();
          const day = selectedDate.getDate();
          const cellKey = `${month}-${day}`;

          setCellData(prev => ({
            ...prev,
            [cellKey]: {
              colorKey,
              message,
              date: selectedDate,
            },
          }));

          setIsColorModalOpen(false);
          setSelectedCell(null);
          setSelectedDate(null);
        }}
      />
    </div>
  );
}

export default CalendarScreen;