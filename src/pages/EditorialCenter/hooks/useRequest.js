import {useState, useEffect, useCallback} from 'react';

const useRequest = (fn, dependence) =>{
    const [data, setData] = useState({Items:[], Count: 0});
    const [loading, setLoading] = useState(false);
    const [PageIndex, setPageIndex] = useState(1);
    const [PageSize, setPageSize] = useState(10);

    // 依赖项 = 各个组件自定义的筛选条件参数 + PageIndex + PageSize
    dependence = [...dependence, PageIndex, PageSize];

    const request = useCallback(() =>{
        setLoading(true); // 设置loading
        fn()
        .then(res=>{
            setData(res.Data);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, dependence);

    // 分页
    const setPagination = (pagination) =>{
        console.log("pagination:-------",pagination)
        setPageIndex(pagination.current);
        setPageSize(pagination.pageSize);
    };
    
    useEffect(() => {
        request()

        return () => { // 销毁
            // request()
        }
    }, dependence)


    return {
        data,
        loading,
        PageIndex,
        PageSize,
        setPagination
    }
}

export default useRequest;