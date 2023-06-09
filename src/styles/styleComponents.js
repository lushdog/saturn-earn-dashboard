import styled from 'styled-components'

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'stretch'};
  gap: ${(props) => props.gap || '0'}px;
  padding: ${(props) => props.padding || '0'}px;
  flex-wrap: ${(props) => props.flexWrap || 'no-wrap'};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns || 'auto'};
  grid-template-rows: ${(props) => props.gridTemplateRows || 'auto'};
  justify-items: ${(props) => props.justifyItems || 'stretch'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'stretch'};
  align-content: ${(props) => props.alignContent || 'stretch'};
  gap: ${(props) => props.gap || '0'}px;
`

// 让 \n 可以换行显示组件
export const PreLine = styled.div`
  white-space: nowrap;
`

export const CardItem = styled.div`
  background: #fff;
  border: 1px solid var(--border-color);
  padding: 27px 32px;
  border-radius: 4px;
  margin-bottom: 8px;
`

export const H4Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--text-bold);
`

export const TextSecond = styled.div`
  font-size: ${(props) => props.fontSize || '12'}px;
  color: var(--text-second);
`

export const TextMain = styled.div`
  font-size: ${(props) => props.fontSize || '16'}px;
  color: var(--text-bold);
`

export const Link = styled.span`
  color: var(--primary-color);
  font-size: ${(props) => props.fontSize || '12'}px;
  cursor: pointer;
`

export const H5Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--text-bold);
`

export const EllipsisCell = styled.div`
  width: ${(props) => props.width || '240'}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Circle = styled.span`
  display: inline-block;
  width: ${(props) => props.width || '16'}px;
  height: ${(props) => props.width || '16'}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

export const CircleDot = styled.span`
  width: ${(props) => props.width || '10'}px;
  height: ${(props) => props.width || '10'}px;
  border-radius: 50%;
  background-color: #fff;
  border: 3px solid var(--primary-color);
`
