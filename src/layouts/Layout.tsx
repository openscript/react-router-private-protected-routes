import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <strong>Great.. layout works too.</strong>
      <Outlet />
    </>
  )
}