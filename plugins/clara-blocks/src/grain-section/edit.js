import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const TEMPLATE = [
	[ 'core/heading', { level: 2, placeholder: 'Section heading…' } ],
	[ 'core/paragraph', { placeholder: 'Section content…' } ],
];

export default function Edit() {
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, { template: TEMPLATE } );

	return (
		<div { ...innerBlocksProps }>
			<div className="grain-canvas-placeholder" aria-hidden="true" />
			{ children }
		</div>
	);
}
