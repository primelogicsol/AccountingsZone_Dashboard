import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 w-full items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-xl font-bold">Accountings</span>
              <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-xl font-bold text-black">ZONE</span>
            </div>
            <span className="sr-only">Accountings ZONE Admin</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
