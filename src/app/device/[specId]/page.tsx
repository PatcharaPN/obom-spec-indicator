"use client";
import { useParams } from "next/navigation";

const deviceMap: Record<string, string> = {
  "OBOM-SS-001": "เครื่องพี่มาย",
  "OBOM-AC-002": "เครื่องพี่เหมียว",
  "OBOM-DS-003": "เครื่องพี่มาส",
  "OBOM-DS-004": "เครื่องพี่จิ๋ว",
  "OBOM-SS-005": "เครื่องพี่เฟิร์น",
  "OBOM-CNC-006": "เครื่องพี่ตุ๊",
  "OBOM-SV-007": "เครื่อง Server",
  "OBOM-PL-008": "เครื่องพี่กานต์",
  "OBOM-PL-009": "เครื่องพี่นิด",
  "OBOM-CNC-010": "เครื่อง CNC",
  "OBOM-ASY-011": "เครื่องห้องประกอบ",
  "OBOM-UA-012": "เครื่อง Meeting",
  "ASSY-UA-013": "โน๊ตบุ๊ค (ขาว) ASSEMBLY",
  "OBOM-QC-014": "QC 1",
  "OBOM-QC-015": "QC 2",
  "OBOM-QC-016": "QC 3",
  "OBOM-QC-017": "QC 4",
  "OBOM-UA-018": "โน๊ตบุ๊ค (ดำ)",
};

function getDeviceNameBySpecId(specId: string | string[] | undefined): string {
  if (!specId) return "ไม่พบข้อมูลอุปกรณ์";

  const id = Array.isArray(specId) ? specId[0] : specId;

  return deviceMap[id] || "ไม่พบข้อมูลอุปกรณ์";
}

export default function DevicePage() {
  const params = useParams();
  const deviceName = getDeviceNameBySpecId(params.specId);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>{deviceName}</h1>
    </div>
  );
}
