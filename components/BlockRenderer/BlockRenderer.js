import { Heading } from 'components/Heading';
import { Paragraph } from 'components/Paragraph';
import React from 'react'
import { Cover } from '../Cover';
import {theme} from 'theme'
import { CallToActionButton } from 'components/CallToActionButton';
import { Column } from 'components/Column';
import { Columns } from 'components/Columns';
import Image from 'next/image';

export const BlockRenderer = ({blocks}) => {
    return blocks.map((block)=> {
        switch (block.name) {
            case "acf/ctabutton": {
                return <CallToActionButton key={block.id} buttonLabel={block.attributes.data.label} destination={block.attributes.data.destination || "/"} align={block.attributes.data.align} />
            }
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
            case "core/column": {
                return <Column key={block.id}>
                    <BlockRenderer blocks={block.innerBlocks} width={block.attributes.width} />
                </Column>
            }
            case "core/columns": {
                return <Columns key={block.id} isStackedOnMobile={block.attributes.isStackedOnMobile} >
                    <BlockRenderer blocks={block.innerBlocks} />
                </Columns>
            }
            case "core/group":
                case "core/block": {
                    return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
                }
            case "core/image": {
                return <Image key={block.id} src={block.attributes.url} alt={block.attributes.alt || ""} height={block.attributes.height} width={block.attributes.width} />
            }
            default: {
                console.log("UNKNOWN: ", block);
                return null;
            }
        }
    })
}
