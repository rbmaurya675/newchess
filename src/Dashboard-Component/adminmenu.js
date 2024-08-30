import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Adminmenu = () => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("logout ....")
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const apiRes = await fetch("http://localhost:7000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            if (apiRes.status === 200) {
                localStorage.removeItem('token');
                navigate('/account/login');
            } else {
                console.error('Error during logout:', await apiRes.json());
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <div>

            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" style={{ background: 'red' }} class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800" style={{ background: 'rgb(158, 108, 146)' }} >
                    <ul class="space-y-2 font-medium">
                        <li>

                            <span class="ms-3  text-white" style={{ textDecoration: 'none' }}>AdminDashboard</span>
                        </li>
                        <li>

                            {/* <ul id="dropdown-example" class="hidden py-2 space-y-2">
                                <li>
                                    <span className='text-white'>Users</span>
                                </li>

                            </ul> */}
                        </li>


                        <li className='mt-4'>
                            <i class="bi bi-wallet2  text-white text-xl"></i>

                            <Link to="/adminwithdrow" style={{ textDecoration: 'none' }} >  <span class="flex-1 ms-3 whitespace-nowrap text-dark text-white" >Withdrawal</span></Link>


                        </li>

                        <li className='mt-4'>

                            <i class="bi bi-person text-2xl text-white "></i>

                            <Link to='/userdata' style={{ textDecoration: 'none' }}><span class="flex-1 ms-3 whitespace-nowrap text-white">Users</span></Link>

                        </li>

                        <li className='mt-4'>
                            <i class="fas fa-money-bill-wave text-xl text-white"></i>
                            <Link to="/translate" style={{ textDecoration: 'none' }}><span class="flex-1 ms-3 whitespace-nowrap text-white">Transition</span></Link>


                        </li>
                        <li className='mt-4'>
                            <i class="bi bi-wallet text-white text-xl"></i>
                            <Link to="/admindeposit" style={{ textDecoration: 'none' }}> <span class="flex-1 ms-3 whitespace-nowrap text-white">Deposit</span></Link>


                        </li>
                        <li className='mt-4'>
                            <i class="bi bi-gear text-white text-xl"></i>
                            <Link to="/dashboardheader" style={{ textDecoration: 'none' }}> <span class="flex-1 ms-3 whitespace-nowrap text-white">Switch User</span></Link>



                        </li>
                        <li className='mt-4'>
                            <i class="bi bi-box-arrow-right text-xl text-white"></i>
                            <span onClick={handleLogout} class="flex-1 ms-3 whitespace-nowrap text-white">Logout</span>


                        </li>

                        <li>

                        </li>
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">
                <div class="">

                    <div>


                    </div>

                    <div >


                    </div>
                </div>
            </div>

        </div >
    )
}

export default Adminmenu
