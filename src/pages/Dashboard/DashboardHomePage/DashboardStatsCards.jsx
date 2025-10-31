import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TechIcon from "@/components/TechIcon";

export default function DashboardStatsCards() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const token = Cookies.get("auth_token");

    axios
      .get("https://api.rcwlogisticsllc.com/api/Admin/GetAllDrivers", {
        headers: {
          Authorization:`Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Drivers Data:", response.data);

        // ✅ Access the nested array inside data
        const driverList = response.data?.data || [];

        setDrivers(driverList);
      })
      .catch((error) => {
        console.error("Error fetching drivers data:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {drivers.length === 0 ? (
        <p className="text-white text-center col-span-full">Loading drivers...</p>
      ) : (
        drivers.map((driver) => (
          <Card
            key={driver.DriverId}
            className="bg-bg2 shadow-two border border-white/10 transition-all duration-300 hover:scale-[1.02]"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-white">
                {driver.FirstName} {driver.LastName}
              </CardTitle>
              <div className="p-2 bg-bg1 rounded-lg">
                <TechIcon name="truck" className="w-5 h-5 text-text2" />
              </div>
            </CardHeader>

            <CardContent className="text-text2 space-y-2">
              <p><strong>Email:</strong> {driver.EmailAddress}</p>
              <p><strong>Phone:</strong> {driver.PhoneNumber}</p>
              <p><strong>Truck Type:</strong> {driver.TruckType}</p>
              <p><strong>City:</strong> {driver.City}</p>
              <p><strong>State:</strong> {driver.State}</p>
              <p><strong>Zip:</strong> {driver.ZipCode}</p>
              <p><strong>Address:</strong> {driver.StreetAddress}</p>
              <p><strong>Note:</strong> {driver.AdditionalEquipmentNotes}</p>

              {driver.Documents && (
                <div className="pt-2">
                  <img
                    src={`https://api.rcwlogisticsllc.com/${driver.Documents}`}
                    alt="Driver Document"
                    className="rounded-lg w-full h-40 object-cover border border-white/10"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}