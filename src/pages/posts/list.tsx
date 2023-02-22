import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
  List,
  Table,
  Pagination,
  DateField,
  CreateButton,
  EditButton,
  Group,
  DeleteButton,
} from "@pankod/refine-mantine";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        cell: function ({ getValue }) {
          return getValue();
        },
      },

      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField format="LL" value={getValue<any>()} />;
        },
      },
      {
        id: "category",
        header: "Category",
        accessorFn: ({ category }) => {
          return category?.title;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: ({ getValue }) => {
          return (
            <Group>
              <EditButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
              <DeleteButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
            </Group>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      metaData: {
        populate: ["category"],
      },
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  console.log(tableData);

  return (
    <List createButtonProps={CreateButton}>
      <Table highlightOnHover striped withBorder withColumnBorders>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
