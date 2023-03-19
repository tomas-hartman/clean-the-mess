import classNames from 'classnames'
import { FC } from 'react'
import { IconName, Icons } from '../../icons/icons'

type ButtonSize = 12 | 16 | 18

type IconProps = {
  name: IconName
  size: ButtonSize
}

export const Icon: FC<IconProps> = ({ name, size }) => {
  const Component = Icons[name]
  
  return <Component className={classNames('icon', `icon-${size}`)} style={{ height: size, width: size, display: 'flex' }} /> 
}
