import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();
	const { children, ...innerBlocksProps } =
		useInnerBlocksProps.save( blockProps );

	return (
		<div { ...innerBlocksProps }>
			<canvas className="grain-canvas" aria-hidden="true" />
			{ children }
		</div>
	);
}
