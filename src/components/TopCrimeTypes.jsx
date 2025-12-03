import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart } from "lucide-react";

const TopCrimeTypes = ({ crimeTypes }) => {
  const getBarColor = (index) => {
    const colors = [
      "bg-rose-500",
      "bg-violet-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-slate-400",
    ];
    return colors[index] || colors[4];
  };

  return (
    <Card className="border-0 shadow-sm bg-white h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-violet-500" />
          Jenis Kriminalitas
        </CardTitle>
      </CardHeader>
      <CardContent
        className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-2 pb-4"
        style={{ maxHeight: "calc(100% - 60px)" }}
      >
        <div className="space-y-3 pr-0">
          {crimeTypes.map((crime, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{crime.type}</span>
                <span className="text-slate-500">
                  {crime.count} kasus ({crime.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(
                    index
                  )} transition-all duration-500`}
                  style={{ width: `${crime.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCrimeTypes;
