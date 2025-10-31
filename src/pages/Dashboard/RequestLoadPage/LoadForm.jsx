import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Qicons from "@/components/Qicons";

import { equipmentOptions, formFields } from "./RequestLoadData.js";

export default function LoadForm({ formData, handleChange }) {
  return (
    <section className="flex-1 w-full border border-text2 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Qicons name="package" className="w-5 h-5 text-white" />
        Load Details
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="emailAddress"
              className="text-sm font-medium text-white"
            >
              {formFields.emailAddress.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="emailAddress"
                placeholder={formFields.emailAddress.placeholder}
                required
                value={formData.emailAddress}
                onChange={(e) => handleChange("emailAddress", e.target.value)}
                className="pl-10 py-2 text-sm bg-transparent"
              />
              <Qicons
                name="mail"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="contactNumber"
              className="text-sm font-medium text-white"
            >
              {formFields.contactNumber.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="contactNumber"
                placeholder={formFields.contactNumber.placeholder}
                required
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                className="pl-10 py-2 text-sm bg-transparent"
              />
              <Qicons
                name="phone"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="pickupLocation"
              className="text-sm font-medium text-white"
            >
              {formFields.pickupLocation.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="pickupLocation"
                placeholder={formFields.pickupLocation.placeholder}
                required
                value={formData.pickupLocation}
                onChange={(e) => handleChange("pickupLocation", e.target.value)}
                className="pl-10 py-2 text-sm bg-transparent"
              />
              <Qicons
                name="map-pin"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="dropoffLocation"
              className="text-sm font-medium text-white"
            >
              {formFields.dropoffLocation.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="dropoffLocation"
                placeholder={formFields.dropoffLocation.placeholder}
                required
                value={formData.dropoffLocation}
                onChange={(e) =>
                  handleChange("dropoffLocation", e.target.value)
                }
                className="pl-10 py-2 text-sm bg-transparent"
              />
              <Qicons
                name="map-pin"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="pickupDate"
              className="text-sm font-medium text-white"
            >
              {formFields.pickupDate.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                type="date"
                id="pickupDate"
                required
                value={formData.pickupDate}
                onChange={(e) => handleChange("pickupDate", e.target.value)}
                className="pl-10 py-2 bg-transparent text-sm [color-scheme:dark]"
              />
              <Qicons
                name="calendar"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="deliveryDate"
              className="text-sm font-medium text-white"
            >
              {formFields.deliveryDate.label}
            </Label>
            <div className="relative">
              <Input
                type="date"
                id="deliveryDate"
                value={formData.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                className="pl-10 py-2 text-sm bg-transparent [color-scheme:dark]"
              />
              <Qicons
                name="calendar"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="equipmentType"
              className="text-sm font-medium text-white"
            >
              {formFields.equipmentType.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <select
                id="equipmentType"
                required
                value={formData.equipmentType}
                onChange={(e) => handleChange("equipmentType", e.target.value)}
                className="w-full h-14 appearance-none rounded-md px-4 pr-10 py-2 text-sm bg-bg1 border border-white text-white"
              >
                <option value="">Select Equipment</option>
                {equipmentOptions.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Qicons
                name="chevron-down"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="weight" className="text-sm font-medium text-white">
              {formFields.weight.label}
            </Label>
            <Input
              id="weight"
              type="number"
              min="1"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              placeholder={formFields.weight.placeholder}
              className="py-2 text-sm bg-transparent"
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <Label
              htmlFor="dimensions"
              className="text-sm font-medium text-white"
            >
              {formFields.dimensions.label}
            </Label>
            <Input
              id="dimensions"
              value={formData.dimensions}
              onChange={(e) => handleChange("dimensions", e.target.value)}
              placeholder={formFields.dimensions.placeholder}
              className="py-2 text-sm bg-transparent"
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <Label
              htmlFor="cargoDescription"
              className="text-sm font-medium text-white"
            >
              {formFields.cargoDescription.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <Textarea
              id="cargoDescription"
              rows={4}
              required
              value={formData.cargoDescription}
              onChange={(e) => handleChange("cargoDescription", e.target.value)}
              placeholder={formFields.cargoDescription.placeholder}
              className="py-2 text-sm bg-transparent resize-none"
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="targetRate"
                className="text-sm font-medium text-white flex items-center gap-1"
              >
                {formFields.targetRate.label}
              </Label>
              <span className="flex items-center gap-2 text-text2 text-sm font-medium cursor-help">
                <Qicons name="trending-up" className="w-4 h-4" />
                Rate Helper
              </span>
            </div>
            <div className="relative max-w-sm">
              <Qicons
                name="dollar-sign"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
              <Input
                id="targetRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.targetRate}
                onChange={(e) => handleChange("targetRate", e.target.value)}
                placeholder={formFields.targetRate.placeholder}
                className="pl-10 py-2 text-sm bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="documents"
              className="text-sm font-medium text-white"
            >
              {formFields.documents.label}
              <span className="text-red-accent1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="documents"
                placeholder={formFields.documents.placeholder}
                required
                value={formData.documents}
                onChange={(e) => handleChange("documents", e.target.value)}
                className="pl-10 py-2 text-sm bg-transparent"
              />
              <Qicons
                name="documents"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2 flex flex-col gap-2">
            <Label
              htmlFor="additionalNotes"
              className="text-sm font-medium text-white"
            >
              {formFields.additionalNotes.label}
            </Label>
            <Textarea
              id="additionalNotes"
              rows={4}
              value={formData.additionalNotes}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
              placeholder={formFields.additionalNotes.placeholder}
              className="py-2 text-sm bg-transparent resize-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between mt-6">
          <Button
            type="submit"
            variant="secondary"
            className="grow max-w-full sm:max-w-xs"
          >
            Post Load
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-transparent text-white"
            onClick={() => console.log("Saved Draft:")}
          >
            Save Draft
          </Button>
        </div>
      </div>
    </section>
  );
}
