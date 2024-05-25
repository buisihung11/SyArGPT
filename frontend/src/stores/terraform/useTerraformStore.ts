import { create } from "zustand"
import { TerraformSlice, createTerraformSlice } from "./terraformSlice"

export const useTerraformStore = create<TerraformSlice>(createTerraformSlice)
