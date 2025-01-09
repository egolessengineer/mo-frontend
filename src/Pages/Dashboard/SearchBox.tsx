import { Combobox, Transition } from "@headlessui/react"
import _ from "lodash"
import { Fragment, useMemo, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { handleCustomError } from "../../Utils/helper"
import { SEARCH_PROJECT } from "../../sevices"

const SearchBox = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('')
    const [filteredsearchData, setFilteredsearchData] = useState<any>([])

    const handleChange = useMemo(
        () =>
            _.debounce((value) => {
                handleSearchtProject(value)
            }, 500),
        []
    );

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        setQuery(newValue);
        handleChange(newValue);
    };

    const handleSearchtProject = async (value: any) => {
        try {
            let param = {
                search: value,
            }
            const searchQuery = "?" + new URLSearchParams(param).toString();
            let { data, status } = await SEARCH_PROJECT(searchQuery);
            if (status === 200) {
                setFilteredsearchData([...data]);
            }
        } catch (error: any) {
            handleCustomError(error);
        } finally {
        }
    }

    return (
        <Combobox>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 h-[40px] text-sm leading-5 text-gray-900 focus:ring-0"
                        onChange={handleInputChange}
                        placeholder="Search projects"
                    />
                    <Combobox.Button className="absolute top-0 right-0 flex items-center p-1">
                        <img
                            src="/Assets/Search.svg"
                            height="28px"
                            width="28px"
                            className="rounded-[5px]"
                            alt=""
                        ></img>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredsearchData.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredsearchData.map((element: any) => (
                                <Combobox.Option
                                    key={element?.Project?.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-25 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={element}
                                    onClick={() => {
                                        navigate(`/project/${element?.Project?.id}`)

                                    }}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {element?.Project?.ProjectDetails?.title || ""}
                                            </span>
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox >
    )
}

export default SearchBox