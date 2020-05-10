
import React, {useRef, useEffect, useState } from 'react'
import { Row, Col, Space, Button } from 'antd'
import ContentSearch from '../components/ContentSearch'
import ContentSelect from '../components/ContentSelect'
import AvatarMenu from '../components/AvatarMenu'
import logo from '../assets/img/banner_logo.svg'
import { BellOutlined, MessageOutlined, EditOutlined } from '@ant-design/icons'

function Nav(props){
    const componentRef = useRef()
    const { width,  } = useContainerDimensions(componentRef)
    return (
        <Row style={{minHeight:80 , paddingRight:20, paddingLeft:20, paddingBottom:10}} align='middle'>
            {/* Logo */}
            <Col className='navitem' flex={1}>
                <div>
                    <a href="http://localhost:3000">
                        <img src={logo} width="200px" alt="banner" />
                    </a>
                </div>
            </Col>

            {/* Page Select */}
            <Col className='navitem' flex={4}>
                <ContentSelect />
            </Col>

            {/* Search Bar */}
            <Col className='navitem' flex={5}>
                <div ref={componentRef}>
                    <ContentSearch width={width} />
                </div>
            </Col>


            {/* Actions */}
            <Col className='navitem' flex={5}>
                <div style={{width:'50%', margin:'auto'}}>
                    <Space>
                        <Button shape='circle' style={{border:'none'}} icon={<BellOutlined />}/>
                        <Button shape='circle' style={{border:'none'}} icon={<MessageOutlined />}/>
                        <Button shape='circle' style={{border:'none'}} icon={<EditOutlined />}/>
                    </Space>
                </div>
            </Col>

            {/* Profile */}
            <Col className='navitem'>
                <div style={{width:'50%', margin:'auto'}}>
                    <AvatarMenu 
                        username={props.username}
                    />
                </div>
            </Col>
        </Row>
    );
}

// Used for dropdown resize of ContentSearch Component
export const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    useEffect(() => {
        const getDimensions = () => ({
            width: myRef.current.offsetWidth,
            height: myRef.current.offsetHeight
        })
        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])
    return dimensions;
};

export default Nav