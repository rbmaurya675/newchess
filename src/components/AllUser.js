import { useEffect, useState } from "react"


const AllUser = () => {

    const [data, setFormData] = useState([]);
    console.log(data)

    const fethUser = async () => {
        const res = await fetch("http://localhost:7000/api/getUser");

        const response = await res.json();
        setFormData(response);

    }

    useEffect(() => {
        fethUser();

    }, [])



    return (
        <div>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Block
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((datas) => {
                                return (
                                    <tr key={datas.id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {datas.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {datas.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {datas.password}
                                        </td>

                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">block</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AllUser
