import React, {useState} from 'react';

const useLoading = ()=>{
    const [loadingState, setLoadingState] = useState(false);
    const setLoading = (state)=>{
        setLoadingState(state)
    }
    return {
        loadingState,
        setLoading
    }
}

export default useLoading;