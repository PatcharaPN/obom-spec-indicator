"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
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
    name: "วิภาดา คุณโฑ",
    department: "Sales Support",
    owner: "มาย",
    employeeId: "006",
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
    <div
      style={{ backgroundImage: 'url("/bg.png")' }}
      className="flex justify-center font-sans items-center  min-h-screen p-8 pb-20 gap-4 sm:p-20 "
    >
      <div className="p-10 w-90 h-fit justify-center items-center border border-blue-400 rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-10">ID: {params.specId}</h2>{" "}
        <div className="flex gap-5 mb-15">
          <div>
            <Image
              src={"/Employee/006.png"}
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
          {" "}
          <div className="flex items-center gap-1">
            {" "}
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
      </div>
    </div>
  );
}
