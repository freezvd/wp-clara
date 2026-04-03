import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<canvas className="grain-canvas" aria-hidden="true" />
			<InnerBlocks.Content />
		</div>
	);
}
