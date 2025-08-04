"use client";
import { useParams } from "next/navigation";

type DeviceInfo = {
  name: string;
  department: string;
  owner: string;
  employeeId: string;
  spec: string[];
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
    name: "เครื่องพี่มาย",
    department: "Sales Support",
    owner: "พี่มาย",
    employeeId: "EMP001",
    spec: [
      "CPU: Ryzen 3 4200GE",
      "Mainboard: A520M-A Prime",
      "RAM: DDR4 8GB bus 2666",
      "VGA: Onboard Radeon Vega",
      "Power: 550W",
    ],
  },
  // เพิ่มเครื่องอื่น ๆ ได้ในโครงสร้างเดียวกัน
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

  if (!device) {
    return <div>ไม่พบข้อมูลอุปกรณ์</div>;
  }

  return (
    <div className="flex justify-center font-sans items-center  min-h-screen p-8 pb-20 gap-4 sm:p-20">
      <div className="w-90 h-90 flex justify-center items-center">
        <div className="">
          <h1>ผู้ดูแล: {device.name}</h1>
          <p>แผนก: {device.department}</p>
          <p>ชื่อผู้รับ: {device.owner}</p>
          <p>รหัสพนักงาน: {device.employeeId}</p>
          <p>สเปค:</p>
          <ul className="list-disc list-inside mt-2 text-left">
            {device.spec.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
