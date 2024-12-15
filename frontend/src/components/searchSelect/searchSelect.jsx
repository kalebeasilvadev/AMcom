import React, {useEffect, useState} from "react";

const SearchSelect = ({
                          fetchItems,
                          onSelect,
                          placeholder = "Search...",
                          itemKey = "id",
                          itemLabel = "name",
                          reset = false,
                          setReset = () => {
                          },
                      }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredItems([]);
            setShowDropdown(false);
            return;
        }

        const fetchFilteredItems = async () => {
            setIsLoading(true);
            const fetchedItems = await fetchItems(searchTerm);
            setFilteredItems(fetchedItems || []);
            setShowDropdown((fetchedItems || []).length > 0);
            setIsLoading(false);
        };

        fetchFilteredItems();
    }, [searchTerm, fetchItems]);

    const handleSelect = (item) => {
        setSearchTerm(item[itemLabel]);
        setShowDropdown(false);
        onSelect(item);
    };

    useEffect(() => {
        if (reset) {
            setSearchTerm("");
            setReset(false);
        }
    }, [reset]);

    return (
        <div style={{position: "relative"}}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder={placeholder}
                className="form-control form-control-sm"
            />
            {isLoading && <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "white",
                padding: "8px"
            }}>Loading...</div>}
            {showDropdown && !isLoading && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        zIndex: 10,
                    }}
                >
                    {filteredItems.map((item) => (
                        <li
                            key={item[itemKey]}
                            onClick={() => handleSelect(item)}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            {item[itemLabel]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchSelect;