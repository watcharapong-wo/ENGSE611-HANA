import React, { useState } from 'react';

// ตัวอย่างเดิม (เวอร์ชันใหม่ตามโจทย์)
import BasicCounter from './components/BasicCounter';
import NameChanger from './components/NameChanger';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import SimpleCalculator from './components/SimpleCalculator';
import CounterGame from './components/CounterGame';

// ตัวอย่าง “สร้างใหม่”
import VotingSystem from './components/VotingSystem';
import NumberGuess from './components/NumberGuess';
import Stopwatch from './components/Stopwatch';
import SimpleChat from './components/SimpleChat';

export default function App() {
  const [activeExample, setActiveExample] = useState('counter');

  const examples = [
    { id: 'counter',    title: '1. ตัวนับพื้นฐาน (+5,+10)', desc: 'useState + ปุ่มเพิ่มหลายค่า', component: <BasicCounter /> },
    { id: 'name',       title: '2. การเปลี่ยนชื่อ (นับจำนวนคำ)', desc: 'นับคำจาก input', component: <NameChanger /> },
    { id: 'color',      title: '3. เปลี่ยนสีพื้นหลัง (เพิ่มพาเลต)', desc: 'จัดการสี + บันทึกสีโปรด', component: <ColorPicker /> },
    { id: 'todo',       title: '4. รายการงาน (มีหมวดหมู่)', desc: 'Array state + category + filter', component: <TodoList /> },
    { id: 'calculator', title: '5. เครื่องคิดเลข (% และ √)', desc: 'หลาย state + คำนวณเพิ่ม', component: <SimpleCalculator /> },
    { id: 'game',       title: '6. เกมนับคะแนน (Power-ups)', desc: 'ตรรกะซับซ้อนขึ้น', component: <CounterGame /> },
    { id: 'voting',     title: '7. ระบบโหวต (ใหม่)', desc: 'เพิ่ม/ลบผู้สมัคร + โหวต', component: <VotingSystem /> },
    { id: 'guess',      title: '8. เกมทายตัวเลข (ใหม่)', desc: 'สุ่มเลข 1-100 + เฉลย', component: <NumberGuess /> },
    { id: 'stopwatch',  title: '9. นาฬิกาจับเวลา (ใหม่)', desc: 'Start/Stop/Reset + Lap', component: <Stopwatch /> },
    { id: 'chat',       title: '10. ระบบแชท (ใหม่)', desc: 'แชทจำลองฝั่งเดียว', component: <SimpleChat /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🎓 React State Management — Activities
          </h1>
          <p className="text-center text-gray-600 mt-2">
            ปรับปรุงตัวอย่าง + กิจกรรมสร้างใหม่
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">เลือกตัวอย่าง:</h3>
              {examples.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => setActiveExample(ex.id)}
                  className={`w-full text-left p-3 mb-2 rounded-lg transition ${
                    activeExample === ex.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{ex.title}</div>
                  <div className="text-sm opacity-75">{ex.desc}</div>
                </button>
              ))}
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {examples.find(ex => ex.id === activeExample)?.component}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
