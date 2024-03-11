import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { PageTitle } from '#/components/ui/page-title'

import { getProfile } from '#/service/profile'

import { KeyIcon, MailIcon, ShieldIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { P, match } from 'ts-pattern'

export default async function Page() {
  const profile = await getProfile()

  if (!profile) notFound()

  return (
    <Fragment>
      <PageTitle title='Profil Saya' />

      <section className='grid md:grid-cols-5 xl:grid-cols-7'>
        <div className='grid grid-cols-1 md:col-span-3 xl:col-span-5 gap-2'>
          <div className='md:hidden flex items-center gap-2'>
            {match(profile.image)
              .with(P.nullish, () => (
                <div className='w-36 h-36 rounded-full bg-secondary text-secondary-foreground text-xl uppercase'>
                  {profile.name.slice(0, 1)}
                </div>
              ))
              .otherwise((image) => (
                <Image
                  priority
                  src={image}
                  alt={profile.name}
                  width={80}
                  height={80}
                  className='rounded-full'
                />
              ))}

            <Button size='sm' className='text-xs' variant='outline'>
              Ubah foto
            </Button>
          </div>

          <div className='flex items-center gap-2 h-10 border-b'>
            <User2Icon size='1rem' className='shrink-0' />
            <span className='select-none font-medium'>Nama Lengkap:</span>
            <p>{profile.name}</p>
          </div>

          <div className='flex items-center gap-2 h-10 border-b'>
            <MailIcon size='1rem' className='shrink-0' />
            <span className='select-none font-medium'>Alamat Email:</span>
            <p>{profile.email}</p>
          </div>

          <div className='flex items-center gap-2 h-10 border-b'>
            <ShieldIcon size='1rem' className='shrink-0' />
            <span className='select-none font-medium'>Role:</span>
            {match(profile.role)
              .with('SUPER_ADMIN', () => <Badge>Super Admin</Badge>)
              .otherwise(() => (
                <Badge variant='secondary'>Admin</Badge>
              ))}
          </div>
          <div className='flex items-center gap-2 h-10 border-b'>
            <KeyIcon size='1rem' className='shrink-0' />
            <span className='select-none font-medium'>Password:</span>
            <p className='blur-sm select-none truncate'>00000000000000000000000000</p>
          </div>

          <div className='flex justify-end pt-6'>
            <Button>Perbarui data</Button>
          </div>
        </div>

        <div className='place-content-center place-items-center gap-2 col-span-2 hidden md:grid'>
          {match(profile.image)
            .with(P.nullish, () => (
              <div className='w-44 h-w-44 rounded-full bg-secondary text-secondary-foreground text-xl uppercase'>
                {profile.name.slice(0, 1)}
              </div>
            ))
            .otherwise((image) => (
              <Image
                priority
                src={image}
                alt={profile.name}
                width={176}
                height={176}
                className='rounded-full'
              />
            ))}

          <Button variant='outline' size='sm' className='max-w-max text-xs'>
            Ubah Foto
          </Button>
        </div>
      </section>
    </Fragment>
  )
}
