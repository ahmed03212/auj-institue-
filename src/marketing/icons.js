/* ===================================================================
 *  ICON REGISTRY
 * ===================================================================
 *  siteContent.js refers to icons by name (e.g. icon: 'Code2') so that
 *  content stays plain data. Those names are resolved here.
 *
 *  Each icon is imported individually and on purpose: a namespace import
 *  (`import * as Icons from 'lucide-react'`) would pull all ~1,500 icons
 *  into the bundle and cost several hundred KB.
 *
 *  ➜ If you add a new `icon:` name in siteContent.js, import it here too.
 * =================================================================== */

import {
  // Course icons
  Code2,
  Palette,
  FileSpreadsheet,
  BrainCircuit,
  Smartphone,
  Cpu,
  BookOpen,
  // Stat icons
  Users,
  UserCheck,
  Laptop,
  // Why-AUJ feature icons
  MonitorSmartphone,
  Wrench,
  Briefcase,
  FolderKanban,
  LifeBuoy,
  // Fallback
  Star,
} from 'lucide-react';

const registry = {
  Code2,
  Palette,
  FileSpreadsheet,
  BrainCircuit,
  Smartphone,
  Cpu,
  BookOpen,
  Users,
  UserCheck,
  Laptop,
  MonitorSmartphone,
  Wrench,
  Briefcase,
  FolderKanban,
  LifeBuoy,
  Star,
};

/** Resolve an icon name from siteContent.js to a component. */
export function getIcon(name) {
  return registry[name] || Star;
}
