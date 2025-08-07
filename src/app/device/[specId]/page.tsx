"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DeviceInfo = {
  name: string;
  department: string;
  owner: string;
  imgurl: string;
  employeeId: string;
  spec: string[];
  repairs?: RepairItem[];
};

type RepairItem = {
  id: number;
  title: string;
  cost?: number;
  totalcost?: number;
  source?: string;
  detail: string;
  date?: string;
};

// const olddeviceMap: Record<string, string> = {
//   "OBOM-SS-001": "เครื่องพี่มาย",
//   "OBOM-AC-002": "เครื่องพี่เหมียว",
//   "OBOM-DS-003": "เครื่องพี่มาส",
//   "OBOM-DS-004": "เครื่องพี่จิ๋ว",
//   "OBOM-SS-005": "เครื่องพี่เฟิร์น",
//   "OBOM-CNC-006": "เครื่องพี่ตุ๊",
//   "OBOM-SV-007": "เครื่อง Server",
//   "OBOM-PL-008": "เครื่องพี่กานต์",
//   "OBOM-PL-009": "เครื่องพี่นิด",
//   "OBOM-CNC-010": "เครื่อง CNC",
//   "OBOM-ASY-011": "เครื่องห้องประกอบ",
//   "OBOM-UA-012": "เครื่อง Meeting",
//   "ASSY-UA-013": "โน๊ตบุ๊ค (ขาว) ASSEMBLY",
//   "OBOM-QC-014": "QC 1",
//   "OBOM-QC-015": "QC 2",
//   "OBOM-QC-016": "QC 3",
//   "OBOM-QC-017": "QC 4",
//   "OBOM-UA-018": "โน๊ตบุ๊ค (ดำ)",
// };
const deviceMap: Record<string, DeviceInfo> = {
  "OBOM-SS-001": {
    name: "วิภาดา คุณโฑ",
    department: "Sales Support",
    owner: "มาย",
    employeeId: "006",
    imgurl: "/Employee/006.png",
    spec: [
      "CPU: Ryzen 3 4200GE",
      "Mainboard: A520M-A Prime",
      "RAM: DDR4 8GB bus 2666",
      "VGA: Onboard Radeon Vega",
      "Power: 550W",
      "OS: Windows 10",
    ],
  },
  "OBOM-AC-002": {
    name: "ทิวาพร สนจิตร์ (เหมี่ยว)",
    department: "Accounting",
    owner: "เหมียว",
    employeeId: "021",
    imgurl: "/Employee/021.png",
    spec: [
      "CPU: Ryzen 3 4300GE",
      "Mainboard: A320",
      "RAM: DDR4 8GB bus 2666MHz",
      "VGA: Onboard Radeon Vega 6",
      "Power: 450W",
      "OS: Windows 10",
    ],
  },
  "OBOM-DS-003": {
    name: "สามารถ อุทาโย (มาส)",
    department: "Design",
    owner: "อุทาโย",
    employeeId: "011",
    imgurl: "/Employee/011.png",
    spec: [
      "CPU: Intel Core i5-12400F",
      "Mainboard: ASUS H110M-K",
      "RAM: DDR4 16GB bus 2666MHz",
      "VGA: NVIDIA Quadro T1000",
      "Power: 650W",
      "OS: Windows 10",
    ],
    repairs: [
      {
        id: 1,
        title: "เปลี่ยนการ์ดจอ",
        detail: "เปลี่ยนการ์ดจอเพื่อแก้ปัญหาอาการกระตุกในระหว่างการทำงาน",
        source: "ซ่อมภายใน",
        date: "15-05-25",
      },
    ],
  },
  "OBOM-DS-004": {
    name: "ชยิน (จิ๋ว)",
    department: "Design",
    owner: "เอกภัทรกุลชัย",
    employeeId: "059",
    imgurl: "/Employee/059.png",
    spec: [
      "CPU: Intel Core i5-8400",
      "Mainboard: ASUS PRIME B360M-A",
      "RAM: DDR4 16GB bus 2666MHz",
      "VGA: NVIDIA RTX 2060",
      "Power: 550W 80+ Bronze",
      "OS: Windows 11",
    ],
  },
  "OBOM-SS-005": {
    name: "วรกมล (เฟริน)",
    department: "Sales Support",
    owner: "อินทรประสิทธิ์",
    employeeId: "061",
    imgurl: "/Employee/061.png",
    spec: [
      "CPU: AMD Athlon 200GE",
      "Mainboard: Gigabyte A320M-S2H V2-CF",
      "RAM: DDR4 4GB bus 2400MHz",
      "VGA: Integrated Radeon Vega 3",
      "Power: 300W",
      "OS: Windows 10",
    ],
  },
  "OBOM-CNC-006": {
    name: "ทนงศักดิ์ สุนธลูน (ตุ๊)",
    department: "CNC",
    owner: "สุนธลูน",
    imgurl: "/Employee/023.png",
    employeeId: "023",
    spec: [
      "CPU: Intel Core i5-4460",
      "Mainboard: ASUS B85M ",
      "RAM: DDR3 8GB",
      "VGA: NVIDIA GTX 950 2GB",
      "Power: 550W",
      "OS: Windows 10",
    ],
  },
  "OBOM-SV-007": {
    name: "พัชรพล พันธุ์แน่น",
    department: "Server",
    owner: "พันธุ์แน่น",
    imgurl: "/Employee/055.png",
    employeeId: "055",
    spec: [
      "CPU: Intel i5-7400 (4) @ 3.500GHz",
      "RAM: 8GB",
      "VGA: NVIDIA GeForce GT 730",
      "OS: Ubuntu 24.04.2 LTS x86_64",
    ],
  },
  "OBOM-PL-008": {
    name: "พีรญา (นิด)",
    department: "Planning",
    owner: "ปานนะลา",
    imgurl: "/Employee/008.png",
    employeeId: "008",
    spec: [
      "CPU: Intel i5-9400F",
      "Mainboard: ASUS PRIME B365M",
      "RAM: 16GB DDR4 2400MHz",
      "VGA: NVIDIA GeForce GTX 1650 4GB",
      "Power: 550W",
    ],
  },
  "OBOM-PL-009": {
    name: "ฐิตาภา (กานต์)",
    department: "Planning",
    owner: "เรืองภู",
    imgurl: "/Employee/010.png",
    employeeId: "010",
    spec: [
      "CPU: Intel i3-5005U (2C/4T @ 2.0GHz)",
      "Mainboard: OEM Notebook Board (Integrated)",
      "RAM: 4GB DDR4 800MHz",
      "VGA: Integrated Intel HD Graphics 5500",
      "Power: 65W Adapter",
    ],
  },
  "OBOM-CNC-010": {
    name: "",
    department: "CNC",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Pentium G3250",
      "Mainboard: H81M-CS",
      "RAM: DDR4 4GB 800MHz",
      "VGA: -",
      "Power: -",
    ],
  },
  "OBOM-ASY-011": {
    name: "สาธิต (บาย)",
    department: "CMM",
    owner: "บิงขุนทด",
    imgurl: "/Employee/056.png",
    employeeId: "056",
    spec: [
      "CPU: Intel Core i7-8750H",
      "Mainboard: 075F7T",
      "RAM: DDR4 8GB 800MHz",
      "VGA: UHD Graphics 630",
      "Power: 65W Adapter",
    ],
    repairs: [
      {
        id: 1,
        title: "เปลี่ยนเเบต",
        detail:
          "เปลี่ยนเเบตเพื่อแก้ไขปัญหาการใช้งานที่ไม่ยาวนานหลังจากถอดสายชาร์จ",
        cost: 1250,
        source: "ซ่อมภายใน",
        date: "15-05-25",
      },
    ],
  },
  "OBOM-UA-012": {
    name: "",
    department: "",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Intel i5-13420H",
      "Mainboard: 8BB2",
      "RAM: DDR4 16GB 3200MHz",
      "VGA: NVIDIA GeForce RTX 2050 6GB",
      "Power: Notebook Adapter",
      "OS: Windows 11",
      "Type: Notebook",
    ],
  },
  "ASSY-UA-013": {
    name: "",
    department: "",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Intel Core i3-4005U",
      "Mainboard: -",
      "RAM: 4GB DDR3L",
      "VGA: Intel HD Graphics 4400",
      "Power: 65W Adapter",
    ],
  },
  "OBOM-QC-014": {
    name: "QC 1",
    department: "QC",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "014",
    spec: [
      "CPU: Intel Xeon W-2123",
      "Mainboard: 81C5HP",
      "RAM: 64GB DDR4 2666MHz",
      "VGA: NVIDIA Quadro P2000",
      "Power: -",
    ],
  },
  "OBOM-QC-015": {
    name: "QC 2",
    department: "QC",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Intel Core i5-6400",
      "Mainboard: B250M Pro4",
      "RAM: 8GB DDR4 2133MHz",
      "VGA: NVIDIA GT 730",
      "Power: -",
    ],
  },
  "OBOM-QC-016": {
    name: "QC 3",
    department: "QC",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Intel Xeon E3-1240 v3",
      "Mainboard: 1905 Hewlett",
      "RAM: 8GB DDR3 800MHz",
      "VGA: NVIDIA Quadro K600",
      "Power: -",
    ],
  },
  "OBOM-QC-017": {
    name: "QC 4",
    department: "QC",
    owner: "",
    imgurl: "/Employee/default.png",
    employeeId: "",
    spec: [
      "CPU: Intel Core i7-7700",
      "Mainboard: -",
      "RAM: -",
      "VGA: NVIDIA Quadro P620",
      "Power: -",
    ],
  },
  "OBOM-P-018": {
    name: "Kyocera ECOSYS P2040dn",
    department: "Office 2",
    owner: "",
    imgurl: "/Devices/p2040dn.webp",
    employeeId: "",
    spec: [
      "ประเภท: เครื่องพิมพ์เลเซอร์ ขาวดำ",
      "ความเร็ว: 40 แผ่น/นาที",
      "ความละเอียด: 1200 dpi",
      "พิมพ์สองหน้าอัตโนมัติ: รองรับ",
      "หน่วยความจำ: 256MB",
      "ความจุกระดาษ: 250 + 100 แผ่น",
      "การเชื่อมต่อ: USB, LAN",
      "ขนาดกระดาษ: สูงสุด A4",
      "รองรับ AirPrint, Mopria",
      "ตลับโทนเนอร์: TK-1160",
    ],
  },
  "OBOM-P-019": {
    name: "",
    department: "Office 2",
    owner: "",
    imgurl: "/Devices/L3210.png",
    employeeId: "",
    spec: [
      "EPSON EcoTank L3210",
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print/Scan/Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 x 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: ~10 ipm",
      "ความเร็วพิมพ์สี: ~5 ipm",
      "รองรับขนาดกระดาษ: A4, A5, A6, B5, Letter",
      "ความจุกระดาษ: 100 แผ่น",
      "เชื่อมต่อ: USB 2.0",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "ระบบแท็งค์หมึก EcoTank (รุ่นหมึก: T00V)",
      "ไม่มี Wi-Fi ในรุ่นนี้",
    ],
  },
  "OBOM-P-020": {
    name: "",
    department: "Office 2",
    owner: "",
    imgurl: "/Devices/L3210.png",
    employeeId: "",
    spec: [
      "EPSON EcoTank L3210",
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print/Scan/Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 x 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: ~10 ipm",
      "ความเร็วพิมพ์สี: ~5 ipm",
      "รองรับขนาดกระดาษ: A4, A5, A6, B5, Letter",
      "ความจุกระดาษ: 100 แผ่น",
      "เชื่อมต่อ: USB 2.0",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "ระบบแท็งค์หมึก EcoTank (รุ่นหมึก: T00V)",
      "ไม่มี Wi-Fi ในรุ่นนี้",
    ],
  },
  "OBOM-P-021": {
    name: "EPSON EcoTank L3110",
    department: "Office 1",
    owner: "",
    imgurl: "/Devices/L3110.jpg",
    employeeId: "",
    spec: [
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print / Scan / Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 × 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: 10 ipm",
      "ความเร็วพิมพ์สี: 5 ipm",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "รองรับกระดาษ: A4, A5, A6, B5, Letter, Legal ฯลฯ",
      "ความจุกระดาษเข้า: 100 แผ่น",
      "ความจุกระดาษออก: 30 แผ่น",
      "การเชื่อมต่อ: USB 2.0",
      "ระบบแท็งค์หมึก EcoTank (หมึก T003 / T00V)",
      "ไม่มี Wi-Fi / ไม่มีถาด ADF",
    ],
  },
  "OBOM-P-022": {
    name: "EPSON EcoTank L3256",
    department: "Office 1",
    owner: "",
    imgurl: "/Devices/L3256.webp",
    employeeId: "",
    spec: [
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print / Scan / Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 × 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: 10 ipm",
      "ความเร็วพิมพ์สี: 5 ipm",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "รองรับกระดาษ: A4, A5, A6, B5, Letter, Legal ฯลฯ",
      "ความจุกระดาษเข้า: 100 แผ่น",
      "ความจุกระดาษออก: 30 แผ่น",
      "การเชื่อมต่อ: USB 2.0, Wi‑Fi, Wi‑Fi Direct",
      "รองรับการพิมพ์ผ่านแอป Epson Smart Panel",
      "ระบบแท็งค์หมึก EcoTank (หมึก T00V)",
      "ไม่มีถาด ADF",
    ],
  },
  "OBOM-P-023": {
    name: "HP OfficeJet Pro 8210",
    department: "Office 1",
    owner: "",
    imgurl: "/Devices/8210.webp",
    employeeId: "",
    spec: [
      "ประเภท: อิงค์เจ็ทสี (Print Only)",
      "ความละเอียดการพิมพ์: สูงสุด 1200 × 1200 dpi (ขาวดำ), 2400 × 1200 dpi (สี)",
      "ความเร็วพิมพ์ขาวดำ: สูงสุด 22 ppm",
      "ความเร็วพิมพ์สี: สูงสุด 18 ppm",
      "รองรับงานพิมพ์สองหน้าอัตโนมัติ (Duplex)",
      "รองรับกระดาษ: A4, A5, A6, B5, Legal, Letter ฯลฯ",
      "ความจุกระดาษเข้า: 250 แผ่น",
      "ความจุกระดาษออก: 150 แผ่น",
      "การเชื่อมต่อ: USB 2.0, Ethernet, Wi‑Fi, Wi‑Fi Direct",
      "รองรับการพิมพ์ผ่าน HP Smart App, Apple AirPrint, Mopria",
      "รองรับ ePrint และการพิมพ์จากอุปกรณ์มือถือ",
      "ใช้ตลับหมึก HP 955 / 955XL",
    ],
  },
  "OBOM-P-024": {
    name: "",
    department: "Office 2",
    owner: "",
    imgurl: "/Devices/L3210.png",
    employeeId: "",
    spec: [
      "EPSON EcoTank L3210",
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print/Scan/Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 x 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: ~10 ipm",
      "ความเร็วพิมพ์สี: ~5 ipm",
      "รองรับขนาดกระดาษ: A4, A5, A6, B5, Letter",
      "ความจุกระดาษ: 100 แผ่น",
      "เชื่อมต่อ: USB 2.0",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "ระบบแท็งค์หมึก EcoTank (รุ่นหมึก: T00V)",
      "ไม่มี Wi-Fi ในรุ่นนี้",
    ],
  },
  "OBOM-QC-025": {
    name: "EPSON EcoTank L3110",
    department: "QC",
    owner: "",
    imgurl: "/Devices/L3110.jpg",
    employeeId: "",
    spec: [
      "ประเภท: อิงค์เจ็ทสีมัลติฟังก์ชัน (Print / Scan / Copy)",
      "ความละเอียดการพิมพ์: สูงสุด 5760 × 1440 dpi",
      "ความเร็วพิมพ์ขาวดำ: 10 ipm",
      "ความเร็วพิมพ์สี: 5 ipm",
      "รองรับงานพิมพ์ไร้ขอบ (Borderless) ขนาด A4",
      "รองรับกระดาษ: A4, A5, A6, B5, Letter, Legal ฯลฯ",
      "ความจุกระดาษเข้า: 100 แผ่น",
      "ความจุกระดาษออก: 30 แผ่น",
      "การเชื่อมต่อ: USB 2.0",
      "ระบบแท็งค์หมึก EcoTank (หมึก T003 / T00V)",
      "ไม่มี Wi-Fi / ไม่มีถาด ADF",
    ],
  },
};
function getDeviceBySpecId(
  specId: string | string[] | undefined
): DeviceInfo | undefined {
  if (!specId) return undefined;

  const id = Array.isArray(specId) ? specId[0] : specId;
  return deviceMap[id];
}

export default function DevicePage() {
  const params = useParams();
  const device = getDeviceBySpecId(params.specId);

  const [activeTab, setActiveTab] = useState<"info" | "repairs">("info");
  const [expandedRepairs, setExpandedRepairs] = useState<number[]>([]);

  if (!device) {
    return <div>ไม่พบข้อมูลอุปกรณ์</div>;
  }
  function toggleRepairExpand(id: number) {
    if (expandedRepairs.includes(id)) {
      setExpandedRepairs(expandedRepairs.filter((rid) => rid !== id));
    } else {
      setExpandedRepairs([...expandedRepairs, id]);
    }
  }
  return (
    <div
      style={{ backgroundImage: 'url("/bg.png")' }}
      className="flex flex-col justify-center font-sans items-center min-h-screen p-8 pb-20 gap-4 sm:p-20"
    >
      {/* <Image
        className="absolute top-5 left-3"
        src={"/Logo.png"}
        width={100}
        height={100}
        alt={""}
      /> */}
      <div className="p-10 w-90 h-fit bg-white justify-center items-center border border-blue-400 rounded-xl shadow-2xl max-w-xl">
        <h2 className="text-xl font-semibold mb-10">ID: {params.specId}</h2>
        {/* Tab Menu */}
        <div className="flex justify-center gap-10 mb-6 border-b border-gray-300 relative">
          <button
            onClick={() => setActiveTab("info")}
            className={`relative py-2 px-4 ${
              activeTab === "info"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            ข้อมูลเครื่อง
            {activeTab === "info" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("repairs")}
            className={`relative py-2 px-4 ${
              activeTab === "repairs"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            รายการซ่อม
            {activeTab === "repairs" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-5 mb-15">
                <div>
                  <Image
                    src={device.imgurl}
                    width={100}
                    height={100}
                    alt={""}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1>ผู้ดูแล: {device.name}</h1>
                  <p>แผนก: {device.department}</p>
                  <p>รหัสพนักงาน: {device.employeeId}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Icon
                    icon="famicons:hardware-chip-outline"
                    width="25"
                    height="25"
                  />
                  <p>สเปค:</p>
                </div>
                <ul className="list-disc list-inside mt-2 text-left">
                  {device.spec.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "repairs" && (
            <div>
              {!device.repairs || device.repairs.length === 0 ? (
                <p>ยังไม่มีประวัติการซ่อม</p>
              ) : (
                <>
                  <ul className="list-inside mt-2 text-left">
                    {device.repairs.map(
                      ({ id, title, detail, source, date, cost }) => (
                        <li key={id} className="mb-3 cursor-pointer">
                          <div
                            onClick={() => toggleRepairExpand(id)}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded"
                          >
                            <span className="text-sm">{title}</span>
                            <p className="text-green-500">{source}</p>

                            <span>
                              {expandedRepairs.includes(id) ? "▲" : "▼"}
                            </span>
                          </div>
                          {expandedRepairs.includes(id) && (
                            <div>
                              <p className="mt-1 px-3 text-gray-700">
                                {detail}
                              </p>
                              <div className="flex gap-5">
                                <p className="bg-orange-400/70 w-fit rounded-full mt-1 px-3 text-white font-semibold">
                                  {date}
                                </p>
                                <p className="bg-green-400/70 w-fit rounded-full mt-1 px-3 text-white font-semibold">
                                  {cost ?? "-"} .-
                                </p>
                              </div>
                            </div>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  {/* แสดงผลรวมราคาทั้งหมด */}
                  <div className="mt-4 p-3 bg-blue-100 rounded text-right font-semibold text-blue-700">
                    รวมราคาซ่อมทั้งหมด:{" "}
                    {device.repairs
                      .reduce((sum, r) => sum + (r.cost ?? 0), 0)
                      .toLocaleString()}{" "}
                    บาท
                  </div>
                </>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
