
import React from "react";
import { Link, Outlet } from "react-router";
import { IoIosCreate } from "react-icons/io";
import useRole from "../router/useRole";
import { FaUser } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { FaRegIdBadge } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";

const DeshboardLayout = () => {
  const { role } = useRole();

  console.log(role);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-bold text-xl text-ore">ClubSphere</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <Link to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-7"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  {/* <span className="is-drawer-close:hidden">Homepage</span>
                   */}
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </Link>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                ></button>
              </li>
              {role === "manager" && (
                <>
                  <li>
                    <Link to="/deshboard">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Admin Overview"
                      >
                        {/* <IoIosCreate className="w-6 h-6" /> */}
                        <MdMapsHomeWork className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          Manager Overview
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/create-club">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="create a club"
                      >
                        <IoIosCreate className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          create a club
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/create-event">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="create a event"
                      >
                        <MdCreateNewFolder className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          create a event
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/my-clubs">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Clubs"
                      >
                        <BsCollectionFill className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">My Clubs</span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/ClubMembersPanel">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Club Members"
                      >
                        <MdGroups2 className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          Club Members
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/event-mangemnet">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Event Management"
                      >
                        <FiCalendar className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          event management
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/manager/event-registrations">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Event Registrations"
                      >
                        <FaRegIdBadge className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          event registrations
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              )}

              {role === "admin" && (
                <>
                  <li>
                    <Link to="/deshboard">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Admin Overview"
                      >
                        {/* <IoIosCreate className="w-6 h-6" /> */}
                        <MdMapsHomeWork className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          Admin Overview
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/deshboard/admin/manageuser">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="mange users"
                      >
                        <FaUser className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          mange users
                        </span>
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/deshboard/admin/manageclub">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip=" manage clubs"
                      >
                        <MdManageHistory className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          mange clubs
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/deshboard/admin/Transactions">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Transactions"
                      >
                        {/* <MdManageHistory className="w-6 h-6" /> */}
                        <MdAttachMoney className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                          Transactions
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              )}

              {role === "member" && (
                <>
                  <li>
                    <Link to="/deshboard">
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Admin Overview"
                      >
                        {/* <IoIosCreate className="w-6 h-6" /> */}
                        <MdMapsHomeWork className="w-6 h-6" />
                        <span className="is-drawer-close:hidden">
                         Member Overview
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deshboard/member/my-club"
                      className="btn btn-ghost justify-start is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Clubs"
                    >
                      <BsCollectionFill className="w-6 h-6" />
                      <span className="is-drawer-close:hidden">My Clubs</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/deshboard/member/my-events"
                      className="btn btn-ghost justify-start is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Events"
                    >
                      <FiCalendar className="w-6 h-6" />
                      <span className="is-drawer-close:hidden">My Events</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/deshboard/member/transaction"
                      className="btn btn-ghost justify-start is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="transaction history"
                    >
                      {/* <FiCalendar className="w-6 h-6" />
                       */}
                       <MdAttachMoney className="w-6 h-6"/>
                      <span className="is-drawer-close:hidden">transaction history</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeshboardLayout;
