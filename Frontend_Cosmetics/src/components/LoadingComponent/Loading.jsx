


import { Flex, Spin } from 'antd'
import React from 'react'

const Loading = ({children,isLoading,delay=500}) => {
  return (
    <Flex  gap="middle" vertical> 
        <Spin spinning={isLoading} delay={delay}>
            <div>
                {children}
            </div>
        </Spin>
    </Flex>
  )
}

export default Loading