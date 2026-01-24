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

function CalendarScreen({ onOpenHistory }: { onOpenHistory: () => void }) {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const rowsPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

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
                fontSize: 8,
                color: "#B7B7B7",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* СЕТКА (ВИЗУАЛ) */}
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
            <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            zIndex: 1,
          }}
          onClick={() => setIsDatePickerOpen(true)}
        />

        {/* PEN BUTTON */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onOpenHistory();
          }}
          style={{
            position: "absolute",
            right: -61,
            bottom: 0,
            width: 45,
            height: 45,
            borderRadius: 60,
            backgroundColor: "#050505",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
          onMouseDown={(e) => {
            const path = e.currentTarget.querySelector("path");
            if (path) path.setAttribute("stroke", "#FFFFFF");
          }}
          onMouseUp={(e) => {
            const path = e.currentTarget.querySelector("path");
            if (path) path.setAttribute("stroke", "#8E8D95");
          }}
          onMouseLeave={(e) => {
            const path = e.currentTarget.querySelector("path");
            if (path) path.setAttribute("stroke", "#8E8D95");
          }}
        >
          <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
            <path
              d="M6.74905 1.96304H1.8786C1.50954 1.96304 1.15559 2.10965 0.894623 2.37062C0.633655 2.63159 0.487045 2.98554 0.487045 3.3546V13.0955C0.487045 13.4646 0.633655 13.8185 0.894623 14.0795C1.15559 14.3405 1.50954 14.4871 1.8786 14.4871H11.6195C11.9886 14.4871 12.3425 14.3405 12.6035 14.0795C12.8645 13.8185 13.0111 13.4646 13.0111 13.0955V8.22505M11.9674 0.919362C12.2442 0.642564 12.6196 0.487061 13.0111 0.487061C13.4025 0.487061 13.7779 0.642564 14.0547 0.919362C14.3315 1.19616 14.487 1.57158 14.487 1.96303C14.487 2.35448 14.3315 2.7299 14.0547 3.0067L7.44483 9.6166L4.66172 10.3124L5.3575 7.52926L11.9674 0.919362Z"
              stroke="#8E8D95"
              strokeWidth="0.97"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <ColorLegend />

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateSelected={(date) => {
          setSelectedDate(date);
          setIsDatePickerOpen(false);
          setIsColorModalOpen(true);
        }}
      />

      <ColorPickerModal
        isOpen={isColorModalOpen}
        onClose={() => {
          setIsColorModalOpen(false);
          setSelectedDate(null);
        }}
        onSave={(colorKey, message) => {
          if (!selectedDate) return;
          const key = `${selectedDate.getMonth()}-${selectedDate.getDate()}`;
          setCellData(prev => ({
            ...prev,
            [key]: { colorKey, message, date: selectedDate },
          }));
          setIsColorModalOpen(false);
          setSelectedDate(null);
        }}
      />
    </div>
  );
}

export default CalendarScreen;