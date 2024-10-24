import { Drawer } from 'antd'



const DrawerComponent = ({tittle= 'Drawer',placement = 'right',isOpen = false,children, ...rests}) => {
  return (
    <>
      <Drawer title={tittle} placement={placement}  open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  )
}

export default DrawerComponent