<script>
    import { ArrowLeftOutline,ArrowRightOutline, TrashBinSolid, EditSolid } from "flowbite-svelte-icons";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
    } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { PUBLIC_API_URL } from "$env/static/public";

    let searchTerm = "";
    /** @type {Array<{
     *  id: number;
     * title: string;
     * content: string;
     * category: string;
     * created_date: string;
     * updated_date: string;
     * status: string;
     * }>} items
     */
    let items = [];


    $: searchTerm, searchItem(searchTerm);

    //debounce searchItem
    /**
     * @type {number}
     */
    let timeout;
    /**
     * Custom search function
     * @param {string} search
     */
    function searchItem(search) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fetchData();
        }, 500);
    }

    let curPage = 1;
    let canNext = false;
    let canPrev = false;
    let nextPage = () => {
        curPage++;
        fetchData();
    };

    let prevPage = () => {
        curPage--;
        fetchData();
    };

    function fetchData() {
        fetch(
            `${PUBLIC_API_URL}/article?search=${searchTerm}&page=${curPage}&status=thrash`,
        )
            .then((res) => res.json())
            .then((data) => {
                items = data.data;
                canNext = data.next;
                canPrev = data.prev;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     * @param {number} id
     */
     function deleteItem(id) {
        fetch(`${PUBLIC_API_URL}/article/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message == "success") {
                    alert("Article deleted successfully!");
                    fetchData();
                } else {
                    alert("Failed to delete article!");
                }
            })
            .catch((err) => {
                alert("Failed to delete article!");
                console.error(err);
            });
    }

    onMount(() => {
        fetchData();
    });
</script>

<div class="w-full">
    <TableSearch
        placeholder="Search by title name"
        hoverable={true}
        bind:inputValue={searchTerm}
    >
        <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
            {#each items as item}
                <TableBodyRow>
                    <TableBodyCell>{item.title}</TableBodyCell>
                    <TableBodyCell>{item.category}</TableBodyCell>
                    <TableBodyCell>
                        <div class="flex p-2 gap-2">
                            <a
                                href="/posts/{item.id}/edit"
                                type="button"
                                class="px-3 py-2 flex text-xs font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                            >
                                <EditSolid class="w-4 h-4" /> Edit
                            </a>
                          
                        </div>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </TableSearch>
    <div class="inline-flex justify-center w-full mt-2 xs:mt-0">
        <button
            on:click={prevPage}
            disabled={!canPrev}
            class="flex items-center justify-center px-4 h-10 text-base font-medium bg-white text-gray-800 rounded-s hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
        >
            <ArrowLeftOutline /> Prev
        </button>
        <button
            on:click={nextPage}
            disabled={!canNext}
            class="flex items-center justify-center px-4 h-10 text-base font-medium bg-white text-gray-800 border-0 border-s border-gray-300 rounded-e hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <ArrowRightOutline /> Next
        </button>
    </div>
</div>
