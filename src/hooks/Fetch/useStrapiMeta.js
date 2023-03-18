import React from "react";

export default function useStrapiMeta(res) {
  /** Meta */
  const pagination = React.useMemo(() => {
    return res?.meta?.pagination ? res?.meta?.pagination : undefined;
  }, [res]);

  const pageAttributes = React.useMemo(() => {
    return {
      page: pagination?.page ? pagination?.page : 0,
      pageCount: pagination?.pageCount ? pagination?.pageCount : 0,

      pageSize: pagination?.pageSize ? pagination?.pageSize : 0,
      total: pagination?.total ? pagination?.total : 0
    };
  }, [pagination]);
  return {
    pagination,
    pageAttributes,
    page: pageAttributes.page,
    pageCount: pageAttributes.pageCount,
    pageSize: pageAttributes.pageSize,
    pageTotal: pageAttributes.total
  };
}
