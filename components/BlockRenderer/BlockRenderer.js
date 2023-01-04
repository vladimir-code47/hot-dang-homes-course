import { Heading } from 'components/Heading';
import { Paragraph } from 'components/Paragraph';
import React from 'react'
import { Cover } from '../Cover';
import {theme} from 'theme'


export const BlockRenderer = ({blocks}) => {
    return blocks.map((block)=> {
        switch (block.name) {
            case 'core/heading':{
                return <Heading key={block.id} level={block.attributes.level} textAlign={block.attributes.textAlign} content={block.attributes.content} />
            }
            case 'core/paragraph': {
                return <Paragraph key={block.id} textAlign={block.attributes.align} content={block.attributes.content} textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text } />
            }
            case "core/cover": {
                console.log("BLOCK: ", block);
                return <Cover key={block.id} background={block.attributes.url}><BlockRenderer blocks={block.innerBlocks}/></Cover>
            }
            default: null;
        }
    })
}
