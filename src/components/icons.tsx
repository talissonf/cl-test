import IconDeleteSvg from '../assets/icon-delete.svg'
import IconEditSvg from '../assets/icon-edit.svg'
import IconFilterSvg from '../assets/icon-filter.svg'
import IconFilterFilledSvg from '../assets/icon-filter-filled.svg'
import IconLikeSvg from '../assets/like.svg'
import IconLikeFilledSvg from '../assets/like-filled.svg'
import IconCommentSvg from '../assets/comment.svg'
import IconLogoutSvg from '../assets/logout.svg'

export function IconDelete(props: React.SVGProps<SVGSVGElement>) {
  return <IconDeleteSvg {...props} />
}

export function IconEdit(props: React.SVGProps<SVGSVGElement>) {
  return <IconEditSvg {...props} />
}

export function IconFilter(props: React.SVGProps<SVGSVGElement>) {
  return <IconFilterSvg {...props} />
}

export function IconFilterFilled(props: React.SVGProps<SVGSVGElement>) {
  return <IconFilterFilledSvg {...props} />
}

export function IconLike(props: React.SVGProps<SVGSVGElement>) {
  return <IconLikeSvg {...props} />
}

export function IconLikeFilled(props: React.SVGProps<SVGSVGElement>) {
  return <IconLikeFilledSvg {...props} />
}

export function IconComment(props: React.SVGProps<SVGSVGElement>) {
  return <IconCommentSvg {...props} />
}

export function IconEditSmall(props: React.SVGProps<SVGSVGElement>) {
  return <IconEditSvg width="16" height="16" {...props} />
}

export function IconDeleteSmall(props: React.SVGProps<SVGSVGElement>) {
  return <IconDeleteSvg width="16" height="16" {...props} />
}

export function IconLogout(props: React.SVGProps<SVGSVGElement>) {
  return <IconLogoutSvg {...props} />
}
