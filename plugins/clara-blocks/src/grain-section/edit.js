import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();
	const { children } = useInnerBlocksProps( {}, {} );

	return (
		<div { ...blockProps }>
			<div className="grain-canvas-placeholder" aria-hidden="true" />
			{ children }
		</div>
	);
}
